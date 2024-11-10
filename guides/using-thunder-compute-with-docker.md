---
title: "Using Thunder Compute with Docker"
description: "This guide explains how to use Thunder Compute with Docker from within a Thunder Compute instance"
mode: wide
sidebarTitle: "Docker"
---

### Note: do not enable GPU passthrough

Do not use the --gpus all flag or NVIDIA runtime Docker images (e.g., nvidia/cuda). These require a physical GPU on your machine and can cause errors like:

`nvidia-container-cli: initialization error: nvml error: driver not loaded: unknown.`

Instead, follow this guide to create a dockerfile that supports Thunder Compute.

## 1. Connect to a Thunder Compute instance

Follow the instructions in our [quickstart guide](https://docs.thundercompute.com/docs/quickstart) to create and connect to a Thunder Compute instance.

If you are running linux, you can directly run the following steps on your local machine, with significantly reduced performance.

## 2. Install TNR inside the container

Modify your dockerfile to include the following lines:

```
FROM ubuntu:22.04

# Install dependencies

RUN apt-get update && apt-get install -y python3-pip

# Install tnr

RUN pip3 install tnr
```

## 3. Set the TNR API Token:

Replace `<your_api_token_here>` with the API token generated from the Thunder Compute console to authenticate requests to TNR.

```
# Existing dockerfile contents

ENV TNR_API_TOKEN=<your_api_token_here>
```

Alternatively, you can pass the api token at runtime

```
docker run -e TNR_API_TOKEN=<your_api_token_here> <your_image>
```

## 4. Use tnr run to Execute Commands

Prefix your commands with tnr run to execute them on a remote GPU:

```
docker run <your_image> tnr run python3 -c "print('GPU setup successful')"
```

## Conclusion

By installing tnr inside your Docker container and avoiding GPU passthrough, you can run your applications on remote GPUs provided by Thunder Compute. Use the `TNR_API_TOKEN` environment variable for authentication, and prefix your commands with `tnr run` to execute them on the remote GPU.

### Example dockerfile

```
FROM ubuntu:22.04

# Install dependencies

RUN apt-get update && apt-get install -y python3-pip

# Install tnr

RUN pip3 install tnr

# Install other packages

RUN pip3 install torch

# Set authentication environment variable

ENV TNR_API_TOKEN=<your_api_token_here>
```
