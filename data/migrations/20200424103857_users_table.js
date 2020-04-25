
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
        tbl.increments();
        tbl.text('username')
            .notNullable()
            .unique();
        tbl.text('email')
            .notNullable()
        tbl.text('password')
            .notNullable()
        tbl.text('user_type')
            .notNullable()
        tbl.text('favorite_cuisine_type')
    })
    .createTable('trucks_table', tbl => {
        tbl.increments();
        tbl.integer('owner_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        tbl.text('truck_name')
            .notNullable()
            .unique()
        tbl.text('truck_img_url')
        tbl.text('cuisine_type')
            .notNullable()
        tbl.time('departure_time')
            .notNullable()
    })
    .createTable('visited_trucks', tbl => {
        tbl.integer('diner_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        tbl.integer('truck_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('trucks_table')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        tbl.integer('rating')
        tbl.boolean('favorite')
            .defaultTo(false)
            .notNullable()
    })
    .createTable('items', tbl => {
        tbl.increments()
        tbl.integer('truck_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('trucks_table')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        tbl.text('item_name')
            .notNullable()
        tbl.text('item_description')
            .notNullable()
        tbl.text('item_photo_url')
        tbl.float('item_price')
            .notNullable()
    })
    .createTable('diner_item_ratings', tbl => {
        tbl.integer('diner_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        tbl.integer('item_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('items')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        tbl.integer('rating')
            .notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('diner_item_ratings')
    .dropTableIfExists('items')
    .dropTableIfExists('visited_trucks')
    .dropTableIfExists('trucks_table')
    .dropTableIfExists('users')
};
