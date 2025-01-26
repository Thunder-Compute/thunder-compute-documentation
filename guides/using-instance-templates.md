---
title: "Using Instance Templates"
description: "Learn how to use Thunder Compute's pre-configured instance templates for popular AI applications"
mode: wide
sidebarTitle: "Instance Templates"
---

Thunder Compute provides pre-configured instance templates that set up popular AI applications automatically. These templates streamline the deployment process and come with all necessary dependencies pre-installed.

## Available Templates

Currently, Thunder Compute offers the following templates:

- **Ollama**: Sets up an Ollama server for running open-source LLMs
- **ComfyUI**: Configures ComfyUI for AI image generation workflows

## Using Templates

1. Create an instance with your chosen template:

```bash
# For Ollama
tnr create --template ollama

# For ComfyUI
tnr create --template comfy-ui
```

2. Connect to your instance:

```bash
tnr connect 0  # Replace 0 with your instance ID
```

3. Start the service:

```bash
# For Ollama
start-ollama

# For ComfyUI
start-comfyui
```

The required ports will be automatically forwarded to your local machine.

## Template Details

### Ollama Template

- Automatically forwards port 11434
- Access the Ollama API at `http://localhost:11434`
- Ready to use with popular Ollama models

### ComfyUI Template

- Automatically forwards port 8188
- Access the ComfyUI interface at `http://localhost:8188`
- Includes common ComfyUI nodes and extensions

{% callout type="info" %}
Port forwarding is handled automatically when you connect to a template instance. You don't need to specify port forwarding manually with the `-t` flag.
{% /callout %}

## Need Help?

If you encounter any issues with instance templates or need assistance, please contact our support team.
