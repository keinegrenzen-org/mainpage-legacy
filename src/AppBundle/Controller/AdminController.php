<?php
/**
* Created by PhpStorm.
* User: Barthy
* Date: 08.11.15
* Time: 11:27
*/

// src/AppBundle/Controller/AdminController.php
namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Session\Session;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;


use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Output\BufferedOutput;
use Symfony\Component\HttpFoundation\Response;

class AdminController extends Controller {

	public function dump($what){
		$kernel = $this->get('kernel');
		$application = new Application($kernel);
		$application->setAutoExit(false);

		$input=0;

		switch($what){
			case 0:
			$input = new ArrayInput(array(
			'command' => 'cache:clear',
			'--env' => 'prod'
			));
			break;
			case 1:
			$input = new ArrayInput(array(
			'command' => 'assetic:dump',
			'--env' => 'prod'
			));
            break;
			case 2:
			$input = new ArrayInput(array(
				'command' => 'assets:install',
				'--env' => 'prod',
			));
			break;
		}

		// You can use NullOutput() if you don't need the output
		$output = new BufferedOutput();
		$application->run($input, $output);

		// return the output, don't use if you used NullOutput()
		$content = $output->fetch();

		// return new Response(""), if you used NullOutput()
		return new Response($content);
	}

	/**
	 * @Route("/admin/dump/{which}", name="dump")
	 * @param $which
	 * @return Response
	 */
	public function dumpAction($which){
		return $this->dump($which);
	}
}