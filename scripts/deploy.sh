#!/usr/bin/env bash
php7.1 ../bin/console cache:clear --env=prod && php7.1 ../bin/console assets:install --symlink /homepages/8/d567573230/htdocs/keinegrenzen/web/ --env=prod
