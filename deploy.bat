set -e
npm run docs:build
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:Shallrise/vuepress-blog.git master:gh-pages
pause