<?php
/**
 * Created by PhpStorm.
 * User: Barthy
 * Date: 18.01.17
 * Time: 16:06
 */

namespace AppBundle\DataFixtures;

use DateTime;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use AppBundle\Entity\Day;

class LoadDayData implements FixtureInterface {
    public function load(ObjectManager $manager) {

        $month = 1;
        $year = 2017;
        $num = cal_days_in_month(CAL_GREGORIAN, $month, $year);
        $today = DateTime::createFromFormat('Y-m-d', time());
        $available = false;
        for ($i = 0; $i < $num; $i++) {
            $date = $year . "-" . $month . "-" . ($i + 1);
            $date = DateTime::createFromFormat('Y-m-d', $date);

            $day = new Day();
            $day->setDate($date);
            $day->setAvailable($available);
            if ($today === $date) {
                $available = true;
            }
            $manager->persist($day);
            $manager->flush();
        }

    }
}