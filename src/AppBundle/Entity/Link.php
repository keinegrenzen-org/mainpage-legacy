<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Link
 *
 * @ORM\Table(name="link")
 * @ORM\Entity()
 */
class Link {

    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @Assert\Url()
     * @Assert\NotBlank()
     * @ORM\Column(name="link", type="string", length=255)
     */
    private $link;

    /**
     * Get id
     *
     * @return integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * Set link
     *
     * @param string $link
     * @return Link
     */
    public function setLink($link) {
        $this->link = $link;

        return $this;
    }

    /**
     * Get link
     *
     * @return string
     */
    public function getLink() {
        return $this->link;
    }

    public function __toString() {
        return $this->getLink();
    }
}
