<?php

namespace AppBundle\Repository;

use Doctrine\ORM\EntityRepository;

class ProfileRepository extends EntityRepository {

    public function findAllGenres() {
        $queryBuilder = $this->createQueryBuilder('p')
            ->select('p.genre, COUNT(p) as profileCount')
            ->groupBy('p.genre');

        return $queryBuilder->getQuery()->getArrayResult();
    }
}