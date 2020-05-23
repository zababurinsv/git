export default  {
    swaggerDefinition: {
        "openapi": "3.0.1",
        "info": {
            "title": "Monopoly DEX",
            "description": "The Web Interface to the Monopoly DEX API",
            "license": {
                "name": "MIT License",
                "url": "https://github.com/wavesplatform/dex/blob/master/LICENSE"
            },
            "version": "2.0.3.1"
        },
        "servers": [
            {
                "url": "/"
            }
        ],
        "tags": [
            {
                "name": "matcher"
            },
            {
                "name": "api v1"
            }
        ],
        "paths": {
            "/matcher": {
                "get": {
                    "tags": [
                        "matcher"
                    ],
                    "summary": "Matcher Public Key",
                    "description": "Get matcher public key",
                    "operationId": "getMatcherPublicKey_1",
                    "responses": {
                        "200": {
                            "description": "successful operation",
                            "content": {
                                "*/*": {
                                    "schema": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/matcher/settings": {
                "get": {
                    "tags": [
                        "matcher"
                    ],
                    "summary": "Matcher Settings",
                    "description": "Get matcher settings",
                    "operationId": "getSettings_1",
                    "responses": {
                        "200": {
                            "description": "successful operation",
                            "content": {
                                "*/*": {
                                    "schema": {
                                        "type": "object"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/matcher/settings/rates": {
                "get": {
                    "tags": [
                        "matcher"
                    ],
                    "summary": "Asset rates",
                    "description": "Get current rates of assets (price of 1 Waves in the specified asset)",
                    "operationId": "getRates_1",
                    "responses": {
                        "200": {
                            "description": "successful operation",
                            "content": {
                                "*/*": {
                                    "schema": {
                                        "type": "object",
                                        "additionalProperties": {
                                            "type": "object",
                                            "properties": {}
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/matcher/orderbook/{amountAsset}/{priceAsset}": {
                "get": {
                    "tags": [
                        "matcher"
                    ],
                    "summary": "Get Order Book for a given Asset Pair",
                    "description": "Get Order Book for a given Asset Pair",
                    "operationId": "getOrderBook_1",
                    "parameters": [
                        {
                            "name": "amountAsset",
                            "in": "path",
                            "description": "Amount Asset Id in Pair, or 'WAVES'",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        },
                        {
                            "name": "priceAsset",
                            "in": "path",
                            "description": "Price Asset Id in Pair, or 'WAVES'",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        },
                        {
                            "name": "depth",
                            "in": "query",
                            "description": "Limit the number of bid/ask records returned",
                            "schema": {
                                "type": "integer"
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "successful operation",
                            "content": {
                                "*/*": {
                                    "schema": {
                                        "type": "object"
                                    }
                                }
                            }
                        }
                    }
                },
                "delete": {
                    "tags": [
                        "matcher"
                    ],
                    "summary": "Remove Order Book for a given Asset Pair",
                    "description": "Remove Order Book for a given Asset Pair. Attention! Use this method only when clients can't place orders on this pair!",
                    "operationId": "orderBookDelete_1",
                    "parameters": [
                        {
                            "name": "amountAsset",
                            "in": "path",
                            "description": "Amount Asset Id in Pair, or 'WAVES'",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        },
                        {
                            "name": "priceAsset",
                            "in": "path",
                            "description": "Price Asset Id in Pair, or 'WAVES'",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "successful operation",
                            "content": {
                                "*/*": {
                                    "schema": {
                                        "type": "object"
                                    }
                                }
                            }
                        }
                    },
                    "security": [
                        {
                            "API Key": []
                        }
                    ]
                }
            },
            "/matcher/orderbook/{amountAsset}/{priceAsset}/info": {
                "get": {
                    "tags": [
                        "matcher"
                    ],
                    "summary": "Get order restrictions for the specified asset pair",
                    "operationId": "orderBookInfo_1",
                    "parameters": [
                        {
                            "name": "amountAsset",
                            "in": "path",
                            "description": "Amount Asset Id in Pair, or 'WAVES'",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        },
                        {
                            "name": "priceAsset",
                            "in": "path",
                            "description": "Price Asset Id in Pair, or 'WAVES'",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "successful operation",
                            "content": {
                                "*/*": {
                                    "schema": {
                                        "type": "object"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/matcher/orderbook": {
                "get": {
                    "tags": [
                        "matcher"
                    ],
                    "summary": "Get the open trading markets",
                    "description": "Get the open trading markets along with trading pairs meta data",
                    "operationId": "orderbooks_1",
                    "responses": {
                        "200": {
                            "description": "successful operation",
                            "content": {
                                "*/*": {
                                    "schema": {
                                        "type": "object"
                                    }
                                }
                            }
                        }
                    }
                },
                "post": {
                    "tags": [
                        "matcher"
                    ],
                    "summary": "Place order",
                    "description": "Place a new limit order (buy or sell)",
                    "operationId": "placeLimitOrder_1",
                    "requestBody": {
                        "description": "Json with data",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Order"
                                }
                            }
                        },
                        "required": true
                    },
                    "responses": {
                        "200": {
                            "description": "successful operation",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object"
                                    }
                                }
                            }
                        }
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/matcher/orderbook/market": {
                "post": {
                    "tags": [
                        "matcher"
                    ],
                    "summary": "Place market order",
                    "description": "Place a new market order (buy or sell)",
                    "operationId": "placeMarketOrder_1",
                    "requestBody": {
                        "description": "Json with data",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Order"
                                }
                            }
                        },
                        "required": true
                    },
                    "responses": {
                        "200": {
                            "description": "successful operation",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object"
                                    }
                                }
                            }
                        }
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/matcher/orders/{address}/cancel": {
                "post": {
                    "tags": [
                        "matcher"
                    ],
                    "summary": "Cancel active orders by IDs",
                    "operationId": "cancelAllById_1",
                    "parameters": [
                        {
                            "name": "address",
                            "in": "path",
                            "description": "Address",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        }
                    ],
                    "requestBody": {
                        "description": "Json array with order ids",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            }
                        },
                        "required": true
                    },
                    "responses": {
                        "200": {
                            "description": "successful operation",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object"
                                    }
                                }
                            }
                        }
                    },
                    "security": [
                        {
                            "API Key": []
                        }
                    ],
                    "x-codegen-request-body-name": "body"
                }
            },
            "/matcher/orderbook/{amountAsset}/{priceAsset}/delete": {
                "post": {
                    "tags": [
                        "matcher"
                    ],
                    "summary": "Delete Order from History by Id",
                    "description": "This method is deprecated and doesn't work anymore. Please don't use it.",
                    "operationId": "historyDelete_1",
                    "parameters": [
                        {
                            "name": "amountAsset",
                            "in": "path",
                            "description": "Amount Asset Id in Pair, or 'WAVES'",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        },
                        {
                            "name": "priceAsset",
                            "in": "path",
                            "description": "Price Asset Id in Pair, or 'WAVES'",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        }
                    ],
                    "requestBody": {
                        "description": "Json with data",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/CancelOrderRequest"
                                }
                            }
                        },
                        "required": true
                    },
                    "responses": {
                        "200": {
                            "description": "successful operation",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object"
                                    }
                                }
                            }
                        }
                    },
                    "deprecated": true,
                    "x-codegen-request-body-name": "body"
                }
            },
            "/matcher/orderbook/{amountAsset}/{priceAsset}/publicKey/{publicKey}": {
                "get": {
                    "tags": [
                        "matcher"
                    ],
                    "summary": "Order History by Asset Pair and Public Key",
                    "description": "Get Order History for a given Asset Pair and Public Key",
                    "operationId": "getAssetPairAndPublicKeyOrderHistory_1",
                    "parameters": [
                        {
                            "name": "amountAsset",
                            "in": "path",
                            "description": "Amount Asset Id in Pair, or 'WAVES'",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        },
                        {
                            "name": "priceAsset",
                            "in": "path",
                            "description": "Price Asset Id in Pair, or 'WAVES'",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        },
                        {
                            "name": "publicKey",
                            "in": "path",
                            "description": "Public Key",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        },
                        {
                            "name": "activeOnly",
                            "in": "query",
                            "description": "Return active only orders (Accepted and PartiallyFilled)",
                            "schema": {
                                "type": "boolean",
                                "default": false
                            }
                        },
                        {
                            "name": "Timestamp",
                            "in": "header",
                            "description": "Timestamp",
                            "required": true,
                            "schema": {
                                "type": "integer"
                            }
                        },
                        {
                            "name": "Signature",
                            "in": "header",
                            "description": "Signature of [Public Key ++ Timestamp] bytes",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "successful operation",
                            "content": {
                                "*/*": {
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {}
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/matcher/orderbook/{publicKey}": {
                "get": {
                    "tags": [
                        "matcher"
                    ],
                    "summary": "Order History by Public Key",
                    "description": "Get Order History for a given Public Key",
                    "operationId": "getPublicKeyOrderHistory_1",
                    "parameters": [
                        {
                            "name": "publicKey",
                            "in": "path",
                            "description": "Public Key",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        },
                        {
                            "name": "activeOnly",
                            "in": "query",
                            "description": "Return active only orders (Accepted and PartiallyFilled)",
                            "schema": {
                                "type": "boolean",
                                "default": false
                            }
                        },
                        {
                            "name": "Timestamp",
                            "in": "header",
                            "description": "Timestamp",
                            "required": true,
                            "schema": {
                                "type": "integer"
                            }
                        },
                        {
                            "name": "Signature",
                            "in": "header",
                            "description": "Signature of [Public Key ++ Timestamp] bytes",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "successful operation",
                            "content": {
                                "*/*": {
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {}
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/matcher/orders/cancel/{orderId}": {
                "post": {
                    "tags": [
                        "matcher"
                    ],
                    "summary": "Cancel Order by ID without signature",
                    "description": "Cancel Order by ID without signature",
                    "operationId": "forceCancelOrder_1",
                    "parameters": [
                        {
                            "name": "orderId",
                            "in": "path",
                            "description": "Order Id",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        },
                        {
                            "name": "X-User-Public-Key",
                            "in": "header",
                            "description": "User's public key",
                            "schema": {
                                "type": "string"
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "successful operation",
                            "content": {
                                "*/*": {
                                    "schema": {
                                        "type": "object"
                                    }
                                }
                            }
                        }
                    },
                    "security": [
                        {
                            "API Key": []
                        }
                    ]
                }
            },
            "/matcher/orders/{address}": {
                "get": {
                    "tags": [
                        "matcher"
                    ],
                    "summary": "All Order History by address",
                    "description": "Get All Order History for a given address",
                    "operationId": "getAllOrderHistory_1",
                    "parameters": [
                        {
                            "name": "address",
                            "in": "path",
                            "description": "Address",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        },
                        {
                            "name": "activeOnly",
                            "in": "query",
                            "description": "Return active only orders (Accepted and PartiallyFilled)",
                            "schema": {
                                "type": "boolean",
                                "default": false
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "successful operation",
                            "content": {
                                "*/*": {
                                    "schema": {
                                        "type": "object"
                                    }
                                }
                            }
                        }
                    },
                    "security": [
                        {
                            "API Key": []
                        }
                    ]
                }
            },
            "/matcher/balance/reserved/{publicKey}": {
                "get": {
                    "tags": [
                        "matcher"
                    ],
                    "summary": "Reserved Balance",
                    "description": "Get non-zero balance of open orders",
                    "operationId": "reservedBalance_1",
                    "parameters": [
                        {
                            "name": "publicKey",
                            "in": "path",
                            "description": "Public Key",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        },
                        {
                            "name": "Timestamp",
                            "in": "header",
                            "description": "Timestamp",
                            "required": true,
                            "schema": {
                                "type": "integer"
                            }
                        },
                        {
                            "name": "Signature",
                            "in": "header",
                            "description": "Signature of [Public Key ++ Timestamp] bytes",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "successful operation",
                            "content": {
                                "*/*": {
                                    "schema": {
                                        "type": "object",
                                        "additionalProperties": {
                                            "type": "object",
                                            "properties": {}
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/matcher/orderbook/{amountAsset}/{priceAsset}/{orderId}": {
                "get": {
                    "tags": [
                        "matcher"
                    ],
                    "summary": "Order Status",
                    "description": "Get Order status for a given Asset Pair during the last 30 days",
                    "operationId": "orderStatus_1",
                    "parameters": [
                        {
                            "name": "amountAsset",
                            "in": "path",
                            "description": "Amount Asset Id in Pair, or 'WAVES'",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        },
                        {
                            "name": "priceAsset",
                            "in": "path",
                            "description": "Price Asset Id in Pair, or 'WAVES'",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        },
                        {
                            "name": "orderId",
                            "in": "path",
                            "description": "Order Id",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "successful operation",
                            "content": {
                                "*/*": {
                                    "schema": {
                                        "type": "object"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/matcher/transactions/{orderId}": {
                "get": {
                    "tags": [
                        "matcher"
                    ],
                    "summary": "Get Exchange Transactions for order",
                    "description": "Get all exchange transactions created by DEX on execution of the given order",
                    "operationId": "getTransactionsByOrder_1",
                    "parameters": [
                        {
                            "name": "orderId",
                            "in": "path",
                            "description": "Order Id",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "successful operation",
                            "content": {
                                "*/*": {
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {}
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/matcher/debug/lastOffset": {
                "get": {
                    "tags": [
                        "matcher"
                    ],
                    "summary": "Get the last offset in the queue",
                    "operationId": "getLastOffset_1",
                    "responses": {
                        "200": {
                            "description": "successful operation",
                            "content": {
                                "*/*": {
                                    "schema": {
                                        "type": "integer",
                                        "format": "int64"
                                    }
                                }
                            }
                        }
                    },
                    "security": [
                        {
                            "API Key": []
                        }
                    ]
                }
            },
            "/matcher/debug/oldestSnapshotOffset": {
                "get": {
                    "tags": [
                        "matcher"
                    ],
                    "summary": "Get the oldest snapshot's offset in the queue",
                    "operationId": "getOldestSnapshotOffset_1",
                    "responses": {
                        "200": {
                            "description": "successful operation",
                            "content": {
                                "*/*": {
                                    "schema": {
                                        "type": "integer",
                                        "format": "int64"
                                    }
                                }
                            }
                        }
                    },
                    "security": [
                        {
                            "API Key": []
                        }
                    ]
                }
            },
            "/matcher/debug/allSnapshotOffsets": {
                "get": {
                    "tags": [
                        "matcher"
                    ],
                    "summary": "Get all snapshots' offsets in the queue",
                    "operationId": "getAllSnapshotOffsets_1",
                    "responses": {
                        "200": {
                            "description": "successful operation",
                            "content": {
                                "*/*": {
                                    "schema": {
                                        "type": "object",
                                        "additionalProperties": {
                                            "type": "object",
                                            "properties": {}
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "security": [
                        {
                            "API Key": []
                        }
                    ]
                }
            },
            "/matcher/debug/saveSnapshots": {
                "post": {
                    "tags": [
                        "matcher"
                    ],
                    "summary": "Saves snapshots for all order books",
                    "operationId": "saveSnapshots_1",
                    "responses": {
                        "200": {
                            "description": "successful operation",
                            "content": {
                                "*/*": {
                                    "schema": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    },
                    "security": [
                        {
                            "API Key": []
                        }
                    ]
                }
            },
            "/matcher/debug/currentOffset": {
                "get": {
                    "tags": [
                        "matcher"
                    ],
                    "summary": "Get a current offset in the queue",
                    "operationId": "getCurrentOffset_1",
                    "responses": {
                        "200": {
                            "description": "successful operation",
                            "content": {
                                "*/*": {
                                    "schema": {
                                        "type": "integer",
                                        "format": "int64"
                                    }
                                }
                            }
                        }
                    },
                    "security": [
                        {
                            "API Key": []
                        }
                    ]
                }
            },
            "/matcher/orderbook/{amountAsset}/{priceAsset}/status": {
                "get": {
                    "tags": [
                        "matcher"
                    ],
                    "summary": "Get Market Status",
                    "description": "Get current market data such as last trade, best bid and ask",
                    "operationId": "marketStatus_1",
                    "parameters": [
                        {
                            "name": "amountAsset",
                            "in": "path",
                            "description": "Amount Asset Id in Pair, or 'WAVES'",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        },
                        {
                            "name": "priceAsset",
                            "in": "path",
                            "description": "Price Asset Id in Pair, or 'WAVES'",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "successful operation",
                            "content": {
                                "*/*": {
                                    "schema": {
                                        "type": "object"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/matcher/orderbook/{amountAsset}/{priceAsset}/tradableBalance/{address}": {
                "get": {
                    "tags": [
                        "matcher"
                    ],
                    "summary": "Tradable balance for Asset Pair",
                    "description": "Get Tradable balance for the given Asset Pair",
                    "operationId": "tradableBalance_1",
                    "parameters": [
                        {
                            "name": "amountAsset",
                            "in": "path",
                            "description": "Amount Asset Id in Pair, or 'WAVES'",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        },
                        {
                            "name": "priceAsset",
                            "in": "path",
                            "description": "Price Asset Id in Pair, or 'WAVES'",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        },
                        {
                            "name": "address",
                            "in": "path",
                            "description": "Account Address",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "successful operation",
                            "content": {
                                "*/*": {
                                    "schema": {
                                        "type": "object",
                                        "additionalProperties": {
                                            "type": "object",
                                            "properties": {}
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/matcher/orderbook/{amountAsset}/{priceAsset}/cancel": {
                "post": {
                    "tags": [
                        "matcher"
                    ],
                    "summary": "Cancel order",
                    "description": "Cancel previously submitted order if it's not already filled completely",
                    "operationId": "cancel_1",
                    "parameters": [
                        {
                            "name": "amountAsset",
                            "in": "path",
                            "description": "Amount Asset Id in Pair, or 'WAVES'",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        },
                        {
                            "name": "priceAsset",
                            "in": "path",
                            "description": "Price Asset Id in Pair, or 'WAVES'",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        }
                    ],
                    "requestBody": {
                        "description": "Json with data",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/CancelOrderRequest"
                                }
                            }
                        },
                        "required": true
                    },
                    "responses": {
                        "200": {
                            "description": "successful operation",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object"
                                    }
                                }
                            }
                        }
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/matcher/orderbook/cancel": {
                "post": {
                    "tags": [
                        "matcher"
                    ],
                    "summary": "Cancel all active orders",
                    "operationId": "cancelAll_1",
                    "requestBody": {
                        "description": "Json with data",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/CancelOrderRequest"
                                }
                            }
                        },
                        "required": true
                    },
                    "responses": {
                        "200": {
                            "description": "successful operation",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object"
                                    }
                                }
                            }
                        }
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/matcher/settings/rates/{assetId}": {
                "put": {
                    "tags": [
                        "matcher"
                    ],
                    "summary": "Add or update rate for the specified asset",
                    "operationId": "upsertRate_1",
                    "parameters": [
                        {
                            "name": "assetId",
                            "in": "path",
                            "description": "Asset for which rate is added or updated",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        }
                    ],
                    "requestBody": {
                        "description": "Rate associated with the specified asset",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "type": "number",
                                    "format": "double"
                                }
                            }
                        },
                        "required": true
                    },
                    "responses": {
                        "200": {
                            "description": "successful operation",
                            "content": {
                                "*/*": {
                                    "schema": {
                                        "$ref": "#/components/schemas/Option"
                                    }
                                }
                            }
                        }
                    },
                    "security": [
                        {
                            "API Key": []
                        }
                    ],
                    "x-codegen-request-body-name": "rate"
                },
                "delete": {
                    "tags": [
                        "matcher"
                    ],
                    "summary": "Delete rate for the specified asset",
                    "operationId": "deleteRate_1",
                    "parameters": [
                        {
                            "name": "assetId",
                            "in": "path",
                            "description": "Asset for which rate is deleted",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "successful operation",
                            "content": {
                                "*/*": {
                                    "schema": {
                                        "$ref": "#/components/schemas/Option"
                                    }
                                }
                            }
                        }
                    },
                    "security": [
                        {
                            "API Key": []
                        }
                    ]
                }
            },
            "/api/v1/orderbook/{amountAsset}/{priceAsset}": {
                "get": {
                    "tags": [
                        "api v1"
                    ],
                    "summary": "Get Order Book for a given Asset Pair",
                    "description": "Get Order Book for a given Asset Pair",
                    "operationId": "getOrderBook_2",
                    "parameters": [
                        {
                            "name": "amountAsset",
                            "in": "path",
                            "description": "Amount Asset Id in Pair, or 'WAVES'",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        },
                        {
                            "name": "priceAsset",
                            "in": "path",
                            "description": "Price Asset Id in Pair, or 'WAVES'",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        },
                        {
                            "name": "depth",
                            "in": "query",
                            "description": "Limit the number of bid/ask records returned",
                            "schema": {
                                "type": "integer"
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "successful operation",
                            "content": {
                                "*/*": {
                                    "schema": {
                                        "type": "object"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "components": {
            "schemas": {
                "Option": {
                    "required": [
                        "defined",
                        "empty"
                    ],
                    "type": "object",
                    "properties": {
                        "empty": {
                            "type": "boolean"
                        },
                        "defined": {
                            "type": "boolean"
                        }
                    }
                },
                "CancelOrderRequest": {
                    "type": "object",
                    "properties": {
                        "sender": {
                            "type": "string"
                        },
                        "orderId": {
                            "type": "string"
                        },
                        "timestamp": {
                            "type": "object",
                            "properties": {}
                        },
                        "signature": {
                            "type": "string"
                        }
                    }
                },
                "Order": {
                    "type": "object"
                }
            },
            "securitySchemes": {
                "API Key": {
                    "type": "apiKey",
                    "name": "X-API-Key",
                    "in": "header"
                }
            }
        }
    },
    apis: ["./Models/User.js", "./Routes/index.js"]
};