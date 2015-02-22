<?php

use yii\db\Schema;
use yii\db\Migration;

class m150222_224900_add_image_table extends Migration
{
    public function up()
    {
    	$this->createTable('cat_image', [
			'id'     => 'pk',
			'url'    => Schema::TYPE_STRING,
			'cat_id' => Schema::TYPE_INTEGER,
    	]);
    	$this->addForeignKey(
    		'cat_image_fx', 'cat_image', 'cat_id', 'cat', 'id', 'CASCADE', 'RESTRICT'
    	);
    }

    public function down()
    {
    	$this->dropTable('cat_image');
    }
}
