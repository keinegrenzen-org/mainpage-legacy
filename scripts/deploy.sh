#!/usr/bin/env bash
php7.1 /homepages/8/d567573230/htdocs/keinegrenzen/bin/console cache:clear --env=prod
php7.1 /homepages/8/d567573230/htdocs/keinegrenzen/bin/console assets:install --symlink /homepages/8/d567573230/htdocs/keinegrenzen/web/ --env=prod
