Assignments for https://lagunita.stanford.edu/courses/Engineering/Compilers/Fall2014/info.
Tech stack: Flex/Bison, C++

# Set up
* Install course VM (https://s3-us-west-1.amazonaws.com/prod-edx/Compilers/VM/compilers-vm.zip).
The provided account is "compilers" and the password is "cool".
* Clone the repository.
* Add the cloned repository as a shared folder to VirtualBox (Settings > Shared folders, select "auto-mount" and "make permament").
Assume you called the folder `Shared`.

* Launch the VM and go to the shared folder: `cd /media/sf_Shared`.
* Copy source files: `cp /usr/class/cs143/cool/`.

# Launch
```bash
cd PA3
make parser
make dotest
```
