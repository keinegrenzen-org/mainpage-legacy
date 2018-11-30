<?php

namespace AdminBundle\Repository;

use Doctrine\ORM\EntityRepository;

class AlbumRepository extends EntityRepository {

    /**
     * @return mixed
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findDownloadCount() {
        $queryBuilder = $this->createQueryBuilder('a')
            ->select('SUM(a.downloads) as downloadCount');

        return $queryBuilder->getQuery()->getSingleScalarResult();
    }
}