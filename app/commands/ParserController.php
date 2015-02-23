<?php
namespace app\commands;

use yii\console\Controller;

class ParserController extends Controller
{
	public function getBaseUrl()
	{
		return 'https://www.avito.ru';
	}

	public function getNokogiri($url)
	{
		return \serhatozles\simplehtmldom\SimpleHTMLDom::file_get_html($url);
	}

	public function getSourceUrl()
	{
		return $this->getBaseUrl() . "/rossiya/koshki?i=1&q=отдам";
	}

	protected function getLinksToAds()
	{
		$p = $this->getNokogiri($this->getSourceUrl());
		$links = $p->find('.catalog-list a.photo-wrapper');
		return array_map(
			function ($href) { return $this->getBaseUrl() . $href; },
			array_map(function ($link) { return $link->href; }, $links)
		);
	}

    public function actionStart() {
    	foreach ($this->getLinksToAds() as $link) {
    		$this->parseAd($link);
    	}
    }

    public function parseAd($url)
    {
    	$p = $this->getNokogiri($url);
    	$cat = new \app\models\Cat;
    	$cat->name = $p->find('h1', 0)->plaintext;
    	$cat->description = $p->find('#desc_text', 0)->plaintext;
    	$cat->contacts = trim($p->find('#seller', 0)->plaintext) . ', ' . trim($p->find('#map', 0)->plaintext);
    	$cat->source = $url;
    	if ($cat->save()) {
    		foreach ($p->find('a.gallery-link') as $a) {
    			$this->addImage($cat, $a->href);
    		}
    	}
    }

    public function addImage(\app\models\Cat $cat, $url)
    {
		$image = new \app\models\CatImage;
		$image->cat_id = $cat->id;
		$image->url = $url;
		$image->save();
    }
}
