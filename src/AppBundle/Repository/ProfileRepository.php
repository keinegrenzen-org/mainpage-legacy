<?php

namespace AppBundle\Repository;

use Doctrine\ORM\EntityRepository;

class ProfileRepository extends EntityRepository {

    public function findAllGenres() {
        $queryBuilder = $this->createQueryBuilder('p')
            ->select('p.genre AS name, COUNT(p) AS profileCount')
            ->groupBy('p.genre');

        return $queryBuilder->getQuery()->getArrayResult();
    }
}