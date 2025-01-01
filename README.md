# Quiz Generator API with Llama Model

This project provides an API to generate multiple-choice questions (MCQs) based on a given topic using the Llama model for natural language processing. It streams responses from the Llama model and returns structured JSON with questions and answers.

## Prerequisites

Before running the project, ensure the following dependencies and tools are installed:

- Node.js: Install Node.js (v14 or higher).

- Ollama: Install Ollama to run the Llama model locally.


- Llama Model:

    - Install the specific Llama model (e.g., llama3.2:1b) using Ollama:

        ```
        ollama pull llama3.2:1b
        ```

    - Verify the model is available:

        ```
        ollama list
        ```


## Installation

- Clone the Repository:

    ```
    git clone https://github.com/furqanmax/Quiz-generator-with-Ollama.git
    cd Quiz-generator-with-Ollama
    ```
- Install Dependencies:

    ```
    npm install
    ```

- Setup Ollama:

  - Ensure Ollama is running and accessible locally.

  - Verify it is reachable at http://localhost:11434 (default Ollama server URL).


## Usage

- Start the Server:

  ```
  node server.js
  ```

- API Endpoint:

  - POST ```/generate-quiz```

    - Request Body:

      ```
      {
        "topic": "<Your Topic Here>"
      }
      ```



## Notes

- Ensure the Llama model is properly installed and accessible through Ollama before running the API.

- Stream handling in the code ensures compatibility with large, streamed responses from the model.

## Troubleshooting

- Ollama not accessible:

  - Verify Ollama is running locally.

  - Check the default URL: http://localhost:11434.

  - Restart Ollama if necessary.

- Model not found:

  - Install the required model with:

    ```ollama pull llama3.2:1b```



## License

This project is licensed under the MIT License. See the LICENSE file for details.

