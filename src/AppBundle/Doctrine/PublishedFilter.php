<?php
/**
 * Created by PhpStorm.
 * User: Barthy
 * Date: 27.06.17
 * Time: 01:19
 */

namespace AppBundle\Doctrine;

use Doctrine\ORM\Mapping\ClassMetadata;
use Doctrine\ORM\Query\Filter\SQLFilter;

class PublishedFilter extends SQLFilter {

    /**
     * Gets the SQL query part to add to a query.
     *
     * @param ClassMetaData $targetEntity
     * @param string $targetTableAlias
     *
     * @return string The constraint SQL if there is available, empty string otherwise.
     */
    public function addFilterConstraint(ClassMetadata $targetEntity, $targetTableAlias) {
        if ($targetEntity->getReflectionClass()->hasProperty("public")) {
            return sprintf('%s.public', $targetTableAlias);
        }

        return '';
    }
}