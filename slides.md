---
# You can also start simply with 'default'
theme: dracula
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
# background: https://cover.sli.dev
# some information about your slides (markdown enabled)
colorSchema: 'dark'
title: 'Simplifying Research Workflows with Containers on Supercomputers'
info: true
author: 'Alan Chapman'
presenter: true
download: false
# filename of the export file
exportFilename: RCExpo-Containers-2024-10-02
# export options
# use export CLI options in camelCase format
# Learn more: https://sli.dev/guide/exporting.html
export:
  format: pptx
  timeout: 30000
  dark: false
  withClicks: true
  withToc: false
#addons: 
#  - @xterm/xterm
lineNumbers: true
# apply unocss classes to the current slide
class: text-center
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
hideInToc: true
# layout: two-cols-header
---

# [Containers]{style="color:white"} 

## [Simplifying Research Workflows with Containers on Supercomputers]{style="color:#FFC627"}
<br>
<br>
<br>

[Alan Chapman]{style="color:white"} <br>
[HPC Systems Administrator]{style="color:white"} <br>
[ASU KE Research Computing]{style="color:white"}

<!-- 
This is a [red text]{style="color:red"} :inline-component{prop="value"}

::block-component{prop="value"}
The **default** slot
::
-->

<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->





---
layout: full
---

# [What are Containers?]{style="color:white"}


<br>
Containers are lightweight, stand-alone packages that contain everything needed to run a piece of software, including the code, runtime, libraries, and environment variables. Unlike virtual machines, containers do not bundle an entire operating system—just the necessary components, making them more efficient, portable, and scalable.
<br>
<br>
<br>
<br>
The efficiency of containers comes from their lightweight nature, allowing for rapid deployment and scaling. Their portability ensures that software runs consistently across different computing environments, from a developer's laptop to an HPC cluster. Scalability is achieved by easily adding more container instances to handle increased load.

<!--

-->

---
level: 1
layout: two-cols-header
---

# [Why are containers important in Research?]{style="color:white"}

::left::
**Reproducibility** <br> 
Containers significantly enhance reproducibility in scientific research


**Portability** <br> 
Containers offer excellent portability across different computing environments

**Efficiency and Ease of Use**<br>
Containers streamline the research workflow

**Consistency in HPC Environments** <br> 
Containers are particularly valuable in High Performance Computing (HPC) settings

::right::
**Isolation and Security**<br>
Containers offer a level of isolation that can be beneficial in research

**Facilitating Collaboration**<br>
Containers make it easier for researchers to share their work

**Supporting Complex Workflows**<br>
In fields like bioinformatics, AI, and quantum computing, containers help manage complex software dependencies:
<!--
## Reproducibility

Containers significantly enhance reproducibility in scientific research:
- They encapsulate the entire software environment, including dependencies, libraries, and specific versions of tools.
- This ensures that experiments and analyses can be replicated accurately across different systems and by different researchers[1].
- Containers can be cited in published papers, allowing other researchers to use the exact same environment for verification[1].

## Portability

Containers offer excellent portability across different computing environments:
- They can run consistently on various platforms, from personal computers to HPC clusters and cloud services[2].
- This portability simplifies collaboration between researchers using different systems or institutions[2].

## Efficiency and Ease of Use

Containers streamline the research workflow:
- They eliminate the need for complex software installations and configuration on each system[3].
- Researchers can quickly deploy and run applications without worrying about system-specific setups[3].

## Consistency in HPC Environments

Containers are particularly valuable in High Performance Computing (HPC) settings:
- They provide a consistent software environment across different HPC clusters[3].
- This consistency is crucial for running complex simulations and data analyses that require specific software stacks.

## Isolation and Security

Containers offer a level of isolation that can be beneficial in research:
- They allow researchers to work with different software versions or configurations without affecting the host system[2].
- In multi-user environments, containers can provide an additional layer of security and stability.

## Facilitating Collaboration

Containers make it easier for researchers to share their work:
- Entire research environments can be shared as container images, allowing collaborators to replicate setups exactly[2].
- This sharing capability accelerates research by reducing setup time and configuration issues.

## Supporting Complex Workflows
In fields like bioinformatics, AI, and quantum computing, containers help manage complex software dependencies:

- They allow researchers to package and run sophisticated tools and models across different platforms[3].
- This is particularly useful for interdisciplinary research where various specialized tools may be required.

In conclusion, containers have become a vital tool in research, enhancing reproducibility, portability, and collaboration while simplifying the management of complex software environments. They address many of the challenges researchers face in ensuring their work is reproducible and their computational environments are consistent and easily shareable.

Citations:
[1] https://commons.und.edu/cgi/viewcontent.cgi?article=1003&context=cs-fac
[2] https://www.bis.org/ifc/publ/ifcb59_06.pdf
[3] https://bssw.io/blog_posts/exploring-containers-for-research-software
[4] https://sylabs.io/2023/03/an-introduction-to-singularity-containers/
-->


---
level: 1 
---

# [Containers vs Virtual Machines]{style="color:white"}

![](./images/containers-vs-virtual-machines.jpg){width=800px lazy}

<!--
A VM emulates a computer system with its own CPU, memory, and network interface. Hardware is virtualized by using a hypervisor that allows multiple VMs to run on a single server. Each VM has a full copy of OS, application binaries, andlibraries

Containers are units of software that contains the code and all dependencies so that an application can run across platforms such as desktops, data centers and cloud. It provides an abstraction at the application layer. Each container runs as isolated
processes while sharing the same OS kernel.
-->

---
level: 1
---

# [Working with Containers]{style="color:white"}

<br>
Run a container
```shell 
apptainer run docker://godlovedc/lolcow
```
<br>
Pull a container from a container registry
```shell
apptainer pull lolcow.sif docker://godlovedc/lolcow
```
<br>
Build a container from a Apptainer Definition file
```shell
apptainer build lolcow.sif lolcow.def
```

<!--
Apptainer run
literally just run the container and if apptainer can't find it locally it'll pull it from docker hub

pull a container to save locally 

building a container with a definition file, can be done with simple definitions, some may need root privileges
-->

---
layout: full
---

# [Example Apptainer Definition file]{style="color:white"}

```shell{1-2|3-18|19-22|23-24}
Bootstrap: docker
From: ubuntu:20.04
%post
    # Update and install necessary packages
    apt-get update && apt-get upgrade -y
    apt-get install -y wget git locales
    # Set environment variable for Itasca
    export ITASCA_VERSION=7.00
    # Download Itasca installer
    wget https://itasca-software.s3.amazonaws.com/itasca-software/v700/itascasoftware_700.latest.deb
    # Install Itasca
    DEBIAN_FRONTEND=noninteractive apt-get -y install -f ./itascasoftware_700.latest.deb
    # Clean up
    rm itascasoftware_700.latest.deb
    apt-get clean
    rm -rf /var/lib/apt/lists/*
    # fix locale info
    sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen && locale-gen
%environment
    export LC_ALL=en_US.UTF-8
    export LANG=en_US.UTF-8
    export LANGUAGE=en_US:en
%runscript
    exec /bin/bash "$@"
```

---
layout: full
---

# [Running a container with a Slurm sbatch script]{style="color:white"}

<br>

```bash {1-8|9-13}
#!/bin/bash
#SBATCH -p general
#SBATCH -q public
#SBATCH --time=0-02:00:00
#SBATCH --gres=gpu:1
#SBATCH --cpus-per-task=8
#SBATCH --mem=20G

export PYTHONNOUSERSITE=True
export ALPHAFOLD_DATA_PATH=/data/alphafold/db_20230619
export USER_ALPHAFOLD_DIR=/scratch/acchapm1/rcexpo/alphafold
export FASTA_FILE=1m5i_MUT.fasta
```


---
layout: full
---

# [Slurm Sbatch example continued]{style="color:white"}

<br>

```bash
apptainer run --nv \
 -B $ALPHAFOLD_DATA_PATH:/data \
 -B .:/etc \
 -B /scratch/acchapm1:/scratch/acchapm1:rw \
 --pwd  /app/alphafold $USER_ALPHAFOLD_DIR/alphafold.sif \
 --fasta_paths=/etc/$FASTA_FILE  \
 --uniref90_database_path=/data/uniref90/uniref90.fasta  \
 --data_dir=/data \
 --mgnify_database_path=/data/mgnify/mgy_clusters.fa   \
 --bfd_database_path=/data/bfd/bfd_metaclust_clu_complete_id30_c90_final_seq.sorted_opt \
 --uniclust30_database_path=/data/uniclust30/uniclust30_2018_08/uniclust30_2018_08 \
 --pdb70_database_path=/data/pdb70/pdb70  \
 --template_mmcif_dir=/data/pdb_mmcif/mmcif_files  \
 --obsolete_pdbs_path=/data/pdb_mmcif/obsolete.dat \
 --max_template_date=2022-02-09   \
 --output_dir=$USER_ALPHAFOLD_DIR/alphafold_output  \
 --model_preset=monomer \
 --db_preset=full_dbs \
 --use_gpu_relax=1
```
---
layout: full
---

# [Container registries]{style="color:white"}

<br>
Container registries are centralized repositories for storing, managing, and distributing container images
<br>
<br>

**Popular container registries:**
   - Docker Hub<br>
   - Nvidia Container registry<br>
   - Amazon Elastic Container Registry (ECR)<br>
   - Google Container Registry (GCR)<br>
   - Azure Container Registry (ACR)<br>
   - GitHub Container Registry<br>
   - Harbor (open-source)<br>



---
layout: center
---

# [Switching container registry authentication]{style="color:white"}

```sh {1-5|16-18|19}
docauth() {
  export APPTAINER_DOCKER_USERNAME=acchapm1
  export APPTAINER_DOCKER_PASSWORD=dckr_pat_8TwjPAGfIldaBZAibZbE6QRju4GdsCre
  export APT_AUTH=docker
}
ngcauth() {
  export APPTAINER_DOCKER_USERNAME="\$oauthtoken"
  export APPTAINER_DOCKER_PASSWORD=sxqMdiyo1erZ0vAq8uSPJYrRViVtAhWEm8m8Xrt9ZUT4DICp3ZXgK2KJ89aOKVMe
  export APT_AUTH=ngc
}
ghauth() {
  export APPTAINER_DOCKER_USERNAME=acchapm1
  export APPTAINER_DOCKER_PASSWORD=ghp_1ELB9XDXXlrseSyoduzwlTPyhGYWQGlF
  export APT_AUTH=ghcr
}
chkauth() {
  echo $APT_AUTH
}
docauth
```

---
layout: center
---

# [Discussion / Questions]{style="color:white"}


