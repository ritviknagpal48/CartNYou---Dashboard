# clean previous build
echo '+++ Cleaning previous builds'
rm -rf backend/public/*
cp backend/backup/* backend/public/

# move to /frontend 
cd frontend

# Install dependencied
npm install

# build the client [Reset any CI modes to ignore warnings]
CI= npm run build

# copy all files from /build/* to /backend/public/*
# cd build
echo '+++ Moving files to backend hosting'
mv build/* ../backend/public/

# Respond with success
rm build
echo '+++ Post Build Completed'