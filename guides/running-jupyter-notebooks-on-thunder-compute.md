---
title: "How to use a Jupyter Notebook on Thunder Compute"
description: "You can run a Jupyter Notebook on Thunder Compute with one command. Follow the steps below to try it yourself."
mode: wide
sidebarTitle: "Jupyter Notebooks"
---

If you prefer video guides, here is an overview of the following steps:

<iframe width="560" height="315" src="https://www.youtube.com/embed/cXOl4kDreiQ?si=UOVy7ykvrBwnh4GX" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### 1. Create and connect to a Thunder Compute instance

Begin by creating and connecting to a Thunder Compute instance. Follow the instructions in our [quickstart guide](https://docs.thundercompute.com/docs/quickstart) if you haven't done this before.

Note: At this point, select the GPU you want to use in your notebook by running:

`$ tnr device <gpu_name>`

You should replace `<gpu_name>` with the name of the GPU you wish to utilize.

### 2. Launch the Jupyter Notebook server

Once connected to your Thunder Compute instance, start the Jupyter Notebook server by executing:

`$ notebook`

This command initiates a Jupyter Notebook server on the remote instance and allows you to access this server from your local computer.

### 3. Access the notebook 

After running the `$ notebook` command, the output will display a URL similar to:

```
[I 14:10:57.914 NotebookApp] Serving notebooks from local directory: /home/user
[I 14:10:57.914 NotebookApp] The Jupyter Notebook is running at:
[I 14:10:57.914 NotebookApp] http://<ip_address>:8000/tree?token=<your_token_here>
[I 14:10:57.915 NotebookApp] Use Control-C to stop this server and shut down all kernels (twice to skip confirmation).

...

    Or copy and paste one of these URLs:
        http://<ip_address>:8000/tree?token=<your_token_here>
```

#### Option 1: View the notebook in your browser

Copy the URL provided and paste it into your web browser.

Important: Ensure the URL includes the token parameter for authentication.

#### Option 2: Access the notebook through VSCode

Follow the instructions in our [Using Thunder Compute with VSCode](https://docs.thundercompute.com/guides/vscode-integration-for-thunder-compute) to set up your remote instance in VSCode.

Next, ensure you have the "Jupyter Notebook" VSCode extension.

By following steps 1-3 of this guide you should have started a `notebook` server within your shell. By default, notebook servers in VSCode exist outside of the TNR environment, so we need to add our server manually.

First, we change the python Kernel of our notebook.

![Change The Notebook Kernel](/images/Change_The_Notebook_Kernel.png)

Next, select "Add an Existing Server"

![Select Existing Server](/images/Select_Existing_Server.png)

Last, copy the URL from step 3 and paste it into this field.

![Add Server URL](/images/Add_Server_URL.png)

### 4. Verify GPU availability in the notebook

Your Jupyter Notebook is now connected to a Thunder Compute instance with GPU capabilities. To confirm that the GPU is accessible, run the following code in a notebook cell:

```
import torch
print(torch.cuda.is_available())
```

If the setup is correct, the output should be:

```
true
```

Here is what this looks like in the browser:

![Checking for a GPU in a Jupyter Notebook](/images/screenshot_torch_cuda.png)

That's it! You are connected to a notebook running in a Thunder Compute instance.

