#!/usr/bin/env bash
php7.1 bin/console cache:clear --env=prod && php7.1 bin/console assets:install --symlink /homepages/8/d567573230/htdocs/keinegrenzen/web/ --env=prod && php7.1 bin/console assetic:dump --env=prod /homepages/8/d567573230/htdocs/keinegrenzen/web/
