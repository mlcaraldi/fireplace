define('views/category',
    ['capabilities', 'models', 'tracking', 'underscore', 'urls', 'utils', 'z'],
    function(capabilities, models, tracking, _, urls, utils, z) {
    'use strict';

    var cat_models = models('category');

    return function(builder, args, params) {
        var category = args[0];
        params = params || {};

        var model = cat_models.lookup(category);
        var name = model && model.name;
        if (name) {
            builder.z('title', name);
        }

        builder.z('type', 'root');
        builder.z('show_cats', true);
        builder.z('cat', category);

        if ('src' in params) {
            delete params.src;
        }

        builder.start('category/main.html', {
            category: category,
            endpoint: urls.api.url('category', [category], params),
            sort: params.sort
        });

        tracking.setPageVar(5, 'Category', category, 3);
    };
});
