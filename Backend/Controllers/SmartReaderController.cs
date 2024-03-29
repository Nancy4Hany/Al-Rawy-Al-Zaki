using Azure.AI.OpenAI;
using Azure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO.Pipelines;

namespace ExpertReaderWebApplication.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SmartReaderController : ControllerBase
    {
        private readonly ILogger<SmartReaderController> _logger;
        private readonly IConfiguration _configuration;
        private readonly OpenAIClient _openAIClient;

        // Constructor initializes necessary components and OpenAI client with configurations
        public SmartReaderController(ILogger<SmartReaderController> logger, IConfiguration configuration)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));

            // Initialize the OpenAI client with settings from appsettings.json
            var endpoint = _configuration["OpenAISettings:Endpoint"];
            var apiKey = _configuration["OpenAISettings:ApiKey"];
            _openAIClient = new OpenAIClient(new Uri(endpoint), new AzureKeyCredential(apiKey));
        }

        // API endpoint that takes age and title as parameters to generate a reader result
        [HttpGet("reader")]
        public async Task<ReaderResult> SmartReader(int age, string title)
        {
            // Adjusts the title based on the age and generates content accordingly
            var agePrompt = GetCompletionFromAgeSpecificContent(title, age);
            var result = new ReaderResult
            {
                Title = title,
                Summary = GenerateAICompletion(agePrompt),
                
                ImageURL = GenerateAIImage(agePrompt)
            };

            return result;
        }

        // Generates text completion based on a given prompt using OpenAI's API
        private string GenerateAICompletion(string prompt)
        {
            // Set up options for the completion request
            var gpt3DeploymentName = _configuration["OpenAISettings:GPT3DeploymentName"];
            var completionsOptions = new CompletionsOptions
            {
                DeploymentName = gpt3DeploymentName,
                Temperature = 0.9f,
                MaxTokens = 800,
                NucleusSamplingFactor = 0.95f,
                FrequencyPenalty = 0,
                PresencePenalty = 0,
                Prompts = { prompt }
            };

            // Request a completion from OpenAI and return the result
            var completionsResponse = _openAIClient.GetCompletions(completionsOptions);
            return completionsResponse.Value.Choices[0].Text;
        }

        // Generates an image based on a given prompt using OpenAI's DALL-E
        private string GenerateAIImage(string prompt)
        {
            // Set up options for the image generation request
            var dalleDeploymentName = _configuration["OpenAISettings:DalleDeploymentName"];
            var imageGenerationOptions = new ImageGenerationOptions
            {
                DeploymentName = dalleDeploymentName,
                Prompt = prompt
            };

            // Request image generation from OpenAI and return the image URI
            var imageGenerations = _openAIClient.GetImageGenerations(imageGenerationOptions);
            var imageUri = imageGenerations.Value.Data[0].Url;
            return imageUri.AbsoluteUri;
        }

        // Modifies the title based on the age category with an appropriate prefix
        private string GetCompletionFromAgeSpecificContent(string title, int age)
        {
            // Define the prefix based on the age category
            string prefix;
            if (age == 1)
            {
                prefix = "توليد محتوى باللغة العربية يناسب الفئة العمرية طفل: ";
            }
            else if (age == 2)
            {
                prefix = "توليد محتوى باللغة العربية يناسب الفئة العمرية مراهق: ";
            }
            else
            {
                prefix = "توليد محتوى باللغة العربية يناسب الفئة العمرية شاب: ";
            }

            // Return the title with the added prefix and a space for separation
            return prefix+" " + title; // A space is added for readability
        }
    }
}
