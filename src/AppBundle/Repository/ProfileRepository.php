<?php

namespace AppBundle\Repository;

use Doctrine\ORM\EntityRepository;

class ProfileRepository extends EntityRepository {

    public function findAllGenres() {
        $queryBuilder = $this->createQueryBuilder('p')
            ->select('p.genre AS name, COUNT(p) AS profileCount')
            ->groupBy('p.genre');

        $results = $queryBuilder->getQuery()->getArrayResult();
        $sluggedResults = array();

        foreach($results as $result){
            $slug = strtolower(str_replace(array(' ', '/'), '-', $result['name']));
            $result['slug'] = $slug;
            $sluggedResults[$result['name']] = $result;
        }

        return $sluggedResults;
    }
}