<?php

namespace AppBundle\Repository;

use Doctrine\ORM\EntityRepository;

class AlbumRepository extends EntityRepository {

    /**
     * @return mixed
     * @throws \Doctrine\ORM\NoResultException
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findDownloadCount() {
        $queryBuilder = $this->createQueryBuilder('a')
            ->select('SUM(a.downloads) as downloadCount');

        return $queryBuilder->getQuery()->getSingleScalarResult();
    }
}