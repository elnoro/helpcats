<?php

use yii\db\Schema;
use yii\db\Migration;

class m150222_223944_create_cat_table extends Migration
{
    public function up()
    {
    	$this->createTable('cat', [
    		'id'          => 'pk',
    		'name'        => Schema::TYPE_STRING,
    		'description' => Schema::TYPE_TEXT,
    		'contacts'    => Schema::TYPE_TEXT,
    	]);
    }

    public function down()
    {
    	$this->dropTable('cat');
    }
}
