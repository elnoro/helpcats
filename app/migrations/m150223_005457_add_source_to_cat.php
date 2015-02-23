<?php

use yii\db\Schema;
use yii\db\Migration;

class m150223_005457_add_source_to_cat extends Migration
{
    public function up()
    {
    	$this->addColumn('cat', 'source', Schema::TYPE_STRING);
    	$this->createIndex('cat_source', 'cat', 'source', true);
    }

    public function down()
    {
    	$this->dropColumn('cat', 'source');
    }
}
