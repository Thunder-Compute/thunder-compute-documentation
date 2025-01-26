---
title: "Using Docker on Thunder Compute"
description: "This guide explains how to use Docker from within a Thunder Compute instance"
mode: wide
sidebarTitle: "Docker"
---

Docker containers on Thunder Compute instances now come with GPU support enabled by default. This means you can run Docker containers with GPU access without any additional configuration.

## Getting Started

1. Connect to a Thunder Compute instance using the [quickstart guide](https://docs.thundercompute.com/docs/quickstart)

2. Run your Docker containers as normal - GPU support is automatically enabled:

```bash
# Run a container with GPU support
docker run ubuntu:22.04 nvidia-smi
# Run Ollama server
docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
```

{% callout type="warning" %}
If you get an error that looks like `docker: unexpected EOF`, try running the command again.
{% /callout %}

## Supported Base Images

Most modern Docker images are supported, with some limitations:

- Ubuntu 22.04 and newer base images are fully supported
- Ubuntu 20.04 base images are currently not supported
- Other distributions like Alpine and Debian are supported

## Disabling GPU Support

If you need to run containers without GPU access, or encounter issues with the thunder runtime:

1. Edit the Docker daemon configuration:

```bash
sudo vi /etc/docker/daemon.json
```

2. Remove "thunder" as the default runtime

3. Restart the Docker service:

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

You can manually set the runtime for a container by adding the `--runtime=thunder` flag to the `docker run` command.

## Example Dockerfile

```dockerfile
FROM ubuntu:22.04

# Install dependencies
RUN apt-get update && apt-get install -y python3-pip

# Install your packages
RUN pip3 install torch

ENTRYPOINT ["python3", "-c", "import torch; print(torch.cuda.is_available())"]
```

## Need Help?

If you encounter any issues or have questions about Docker support, please contact our support team.
