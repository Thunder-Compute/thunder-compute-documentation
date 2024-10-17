---
title: "Integrating Thunder Compute with VSCode"
description: "This guide will walk you through integrating Thunder Compute with Visual Studio Code (VSCode), allowing you to develop and manage your projects directly on a Thunder Compute instance from your local IDE."
mode: wide
sidebarTitle: "Integrating with VSCode"
---

## Prerequisites

- A Thunder Compute account
- Visual Studio Code installed
- A Thunder Compute instance created (see Step 1)

## Steps

### 1. Create a Thunder Compute instance

First, create a Thunder Compute instance by following the steps in the [Quickstart Guide](https://docs.thundercompute.com/docs/quickstart).

### 2. Find the Public IP of your instance

Use the following command to find the public IP address of your newly created instance:

`tnr status`

This will display a list of your instances along with their details.

![Using TNR Status](/images/tnr_status.png)

### 3. Install the Remote - SSH extension

Install the Remote - SSH extension in VSCode. If you are using a different IDE, there is likely a similar extension.

![Adding Remote SSH](/images/Remote_SSH_Extension.png)

### 4. Add an SSH connection in Remote Explorer

Navigate to the Remote Explorer in VSCode and click on "Add SSH Connection".

![Adding SSH Connection](/images/Adding_SSH_Connection.png)

### 5. Configure the SSH connection

Enter the SSH command using the key found in `~/.thunder/keys/<key_file_name>`. The key file name follows the format `id_rsa_....`

#### Example:

`ssh -i ~/.thunder/keys/<id_rsa_example> ubuntu@<public_ip_address>`

Replace `<public_ip_address>` with the IP you obtained in Step 2.

![Adding Thunder Compute to VSCode](/images/Adding_Thunder_Compute_To_VSCode.png)

### 6. Connect to the Remote instance

In the Remote Explorer, select the new SSH target to connect.

![Remote Connection](/images/VS_Code_Environment.png)

## Conclusion

You have successfully connected VSCode to your Thunder Compute instance. You can now develop as if you are locally attached to a virtual GPU.
