<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace app\assets;

use yii\web\AssetBundle;

/**
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
class AppAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'css/site.css',
    ];
    public $js = [
        "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.13/angular.js",
        "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.13/angular-route.js",
        "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.13/angular-resource.min.js",
        "js/app.js",
    ];
    public $depends = [
        'yii\web\YiiAsset',
        'yii\bootstrap\BootstrapAsset',
    ];
}
