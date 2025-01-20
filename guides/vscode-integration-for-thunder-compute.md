---
title: "Integrating Thunder Compute with VSCode"
description: "This guide will walk you through integrating Thunder Compute with Visual Studio Code (VSCode), allowing you to develop and manage your projects directly on a Thunder Compute instance from your local IDE."
mode: wide
sidebarTitle: "VSCode Integration"
---

## Prerequisites

- A Thunder Compute account
- Visual Studio Code installed
- A Thunder Compute instance created (see Step 1)

## Steps

### 1. Create a Thunder Compute instance

First, create a Thunder Compute instance by following the steps in the [Quickstart Guide](https://docs.thundercompute.com/docs/quickstart).

### 2. Install the Remote - SSH extension

Install the Remote - SSH extension in VSCode. If you are using a different IDE, there likely exists a similar extension.

![Adding Remote SSH](/images/Remote_SSH_Extension.png)

### 3. Add the Thunder Compute instance to Remote Explorer

Navigate to the Remote Explorer on the left sidebar in VSCode. You should see your instance listed as `tnr-0`

![Thunder Compute Instance in VSCode Remote Explorer](/images/tnr-instance_id.png)

Optionally, If the instance does not automatically appear, you can click the "plus" icon for "new remote" and use the command `ssh <instance_public_ip>` to connect to the instance. You do not need to configure keys or username, as these are also stored in `.ssh`.

Note: if the instance is stopped it will not appear in Remote Explorer. Use the command `$ tnr start <instance_id>` to start it.

### 4. Connect to the Remote instance

In the Remote Explorer, select the new SSH target to connect.

![Remote Connection](/images/VS_Code_Environment.png)

## Conclusion

You have successfully connected VSCode to your Thunder Compute instance. You can now develop as if you are locally attached to a virtual GPU.
