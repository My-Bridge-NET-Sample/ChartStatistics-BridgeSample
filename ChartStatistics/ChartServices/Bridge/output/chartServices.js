/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2016
 * @compiler Bridge.NET 15.6.0
 */
Bridge.assembly("ChartServices", function ($asm, globals) {
    "use strict";

    Bridge.define("ChartServices.BarChartGenerator", {
        getRootElement: function (rows, columns, values) {
            var y = 0;
            return Bridge.merge(new ChartServices.RootElement(), {
                setRowElements: System.Linq.Enumerable.from(rows).select(Bridge.fn.bind(this, function (row) {
                        return Bridge.merge(new ChartServices.RowElement(), {
                            setColumnElements: this.getColumnElements(columns, System.Linq.Enumerable.from(values).skip(row).first(), y),
                            setHeaderRectagle: Bridge.merge(new ChartServices.Rectangle(), {
                                setText: row > 0 ? row.toString() : null,
                                setX1: 0,
                                setX2: 100,
                                setY1: y,
                                setY2: ((y = y + 100))
                            } )
                        } );
                    })).toArray()
            } );
        },
        getColumnElements: function (columns, values, y) {
            var x = 100;
            return System.Linq.Enumerable.from(columns).select(function (column) {
                    return Bridge.merge(new ChartServices.ColumnElement(), {
                        setValueRectangle: Bridge.merge(new ChartServices.Rectangle(), {
                            setText: Bridge.Int.format(System.Linq.Enumerable.from(values).skip(column).first(), "0.00"),
                            setX1: x,
                            setX2: x + 100,
                            setY1: y,
                            setY2: y + 100
                        } ),
                        setHeaderRectangle: Bridge.merge(new ChartServices.Rectangle(), {
                            setText: column > 0 ? column.toString() : null,
                            setX1: x,
                            setX2: ((x = x + 100)),
                            setY1: y,
                            setY2: y + 100
                        } )
                    } );
                }).toArray();
        }
    });

    Bridge.define("ChartServices.BarChartGenerator3D", {
        getRootElement: function (rows, columns, values) {
            var x = 0, z = 0;
            return Bridge.merge(new ChartServices.RootElement3D(), {
                setValueRectangles: this.getValueRectangles(values),
                setRowHeaderRectagles: System.Linq.Enumerable.from(rows).select(function (row) {
                        return Bridge.merge(new ChartServices.Rectangle3D(), {
                            setText: row > 0 ? row.toString() : null,
                            setX1: 0,
                            setX2: 100,
                            setY1: 0,
                            setY2: 0,
                            setZ1: z,
                            setZ2: ((z = z + 100))
                        } );
                    }).toArray(),
                setColumnHeaderRectagles: System.Linq.Enumerable.from(columns).select(function (column) {
                        return Bridge.merge(new ChartServices.Rectangle3D(), {
                            setText: column > 0 ? column.toString() : null,
                            setX1: x,
                            setX2: ((x = x + 100)),
                            setY1: 0,
                            setY2: 0,
                            setZ1: 0,
                            setZ2: 100
                        } );
                    }).toArray()
            } );
        },
        getValueRectangles: function (values) {
            var x = 0, z;
            return System.Linq.Enumerable.from(values).select(function (rowValues) {
                    x += 100;
                    z = 100;
                    return System.Linq.Enumerable.from(rowValues).select(function (value) {
                            return Bridge.merge(new ChartServices.Rectangle3D(), {
                                setText: Bridge.Int.format(value, "0.##"),
                                setX1: x,
                                setX2: x + 100,
                                setY1: 0,
                                setY2: System.Decimal.toFloat(value),
                                setZ1: z,
                                setZ2: ((z = z + 100))
                            } );
                        }).toArray();
                }).toArray();
        }
    });

    Bridge.define("ChartServices.ColumnElement", {
        config: {
            properties: {
                HeaderRectangle: null,
                ValueRectangle: null
            }
        }
    });

    Bridge.define("ChartServices.Rectangle", {
        config: {
            properties: {
                Text: null,
                X1: 0,
                X2: 0,
                Y1: 0,
                Y2: 0
            }
        }
    });

    Bridge.define("ChartServices.RootElement", {
        config: {
            properties: {
                RowElements: null
            }
        }
    });

    Bridge.define("ChartServices.RootElement3D", {
        config: {
            properties: {
                RowHeaderRectagles: null,
                ColumnHeaderRectagles: null,
                ValueRectangles: null
            }
        }
    });

    Bridge.define("ChartServices.RowElement", {
        config: {
            properties: {
                HeaderRectagle: null,
                ColumnElements: null
            }
        }
    });

    Bridge.define("ChartServices.Rectangle3D", {
        inherits: [ChartServices.Rectangle],
        config: {
            properties: {
                Z1: 0,
                Z2: 0
            }
        }
    });
});
