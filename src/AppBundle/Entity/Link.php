<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Link
 *
 * @ORM\Table(name="link")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\LinkRepository")
 */
class Link
{
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
     * @ORM\Column(name="title", type="string", length=255, nullable=true)
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="link", type="string", length=255)
     */
    private $link;

    /**
     * @var string
     *
     * @ORM\Column(name="social", type="string", length=3, nullable=true)
     */
    private $social;

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set title
     *
     * @param string $title
     * @return Link
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set link
     *
     * @param string $link
     * @return Link
     */
    public function setLink($link)
    {
        $this->link = $link;

        $url = parse_url($link, PHP_URL_HOST);
        $url = str_replace(array('www.', '.com'), '', $url);
        $social = ($url == 'facebook') ? 'fb' : ($url == 'soundcloud') ? 'sc' : ($url == 'twitter') ? 'tw' : ($url == 'youtube') ? 'yt' : null;
        $this->setSocial($social);

        return $this;
    }

    /**
     * Get link
     *
     * @return string
     */
    public function getLink()
    {
        return $this->link;
    }

    public function getAlt($in)
    {
        return ($in == 'youtube') ? $in . '-play' : $in;
    }

    public function getMarkup()
    {
        $link = $this->getLink();
        $social = $this->getSocial();
        $socialIcon = ($social == 'youtube') ? $social . '-play' : $social;
        $title = $this->getTitle();
        return "<a href=\"$link\" target=\"_blank\" title=\"$title\" rel=\"nofollow\" class=\"social-link\"><span class=\"fa-stack text-muted\"><i class=\"fa fa-circle fa-stack-2x fa-fw\"></i><i class=\"fa fa-$socialIcon fa-stack-1x fa-inverse fa-fw\"></i><span class='sr-only'>$title</span></span></a>";
    }

    /**
     * @return mixed
     */
    public function getSocial()
    {
        return ($this->social == 'tw') ? 'twitter' : (($this->social == 'sc') ? 'soundcloud' : (($this->social == 'yt') ? 'youtube' : (($this->social == 'fb') ? 'facebook' : 'link')));
    }

    /**
     * @param mixed $social
     */
    public function setSocial($social)
    {
        $this->social = $social;
    }
}
