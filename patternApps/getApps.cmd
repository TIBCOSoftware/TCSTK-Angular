# You can now checkout certain Apps from a Angular repository.
# first create a 'tibDev' Main Folder to store all your Apps.

cd c:\tibDev
git init TCSTK-base-app
cd TCSTK-base-app

# add main Repo Uri to App Checkout Folder
git remote add -f origin https://github.com/TIBCOSoftware/TCST-Angular.git

# sparseCheckout, is basically the oposite of 
git config core.sparseCheckout true
echo patternApps/TCSTK-base-app >> .git/info/sparse-checkout

# you add more as you like
#echo patternApps/TCSTK-case-manager-app >> .git/info/sparse-checkout
