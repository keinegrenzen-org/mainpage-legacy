<?php

namespace AppBundle\Repository;

use Doctrine\ORM\EntityRepository;

class DonationRepository extends EntityRepository {

    /**
     * @return mixed
     */
    public function findStatistics() {
        $queryBuilder = $this->createQueryBuilder('d')
            ->select('SUM(d.amount) AS total')
            ->addSelect('COUNT(d.id) AS donationCount');

        $statistics = reset($queryBuilder->getQuery()->getScalarResult());
        $statistics['total'] = number_format(($statistics['total'] /100), 0, ',', '');
        return $statistics;
    }

}