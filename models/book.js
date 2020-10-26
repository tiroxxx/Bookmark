/* eslint-disable camelcase */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */
module.exports = function (sequelize, DataTypes) {
    const Book = sequelize.define("Book", {
        title: DataTypes.TEXT,
        series: DataTypes.TEXT,
        cover_link: DataTypes.TEXT,
        author: DataTypes.TEXT,
        average_rating: DataTypes.TEXT,
        number_of_pages: DataTypes.TEXT,
        date_published: DataTypes.TEXT,
        publisher: DataTypes.TEXT,
        amazon_link: DataTypes.TEXT,
        recommendation: DataTypes.TEXT,
        description: DataTypes.TEXT
    },
        {
            timestamps: false
        });

    return Book;
};
