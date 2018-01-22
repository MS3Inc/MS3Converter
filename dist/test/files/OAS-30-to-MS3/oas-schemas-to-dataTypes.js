"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oasPrimitive = {
    'mySchema': {
        'type': 'string',
        'description': '123',
        'example': '2',
        'default': '3',
        'pattern': '2',
        'minLength': 1,
        'maxLength': 4,
        'enum': [
            '123'
        ]
    }
};
exports.ms3Primitive = {
    'type': 'string',
    'description': '123',
    'name': 'mySchema',
    'example': '2',
    'default': '3',
    'pattern': '2',
    'minLength': 1,
    'maxLength': 4,
    'enum': [
        '123'
    ],
    '__id': 'uuid'
};
exports.oasArray = {
    'mySchema': {
        'type': 'array',
        'items': {
            'type': 'string',
            'description': '123',
            'example': '2',
            'default': '3',
            'pattern': '2',
            'minLength': 1,
            'maxLength': 4,
            'enum': [
                '123'
            ]
        }
    }
};
exports.ms3Array = {
    'name': 'mySchema',
    'type': 'array',
    'items': {
        'type': 'string',
        'description': '123',
        'example': '2',
        'default': '3',
        'pattern': '2',
        'minLength': 1,
        'maxLength': 4,
        'enum': [
            '123'
        ]
    },
    '__id': 'uuid'
};
exports.oasObject = {
    'mySchema': {
        'type': 'object',
        // 'required': [
        //   'id',
        //   'name'
        // ],
        'properties': {
            'name': {
                'type': 'string'
            },
            'type': {
                'type': 'string'
            },
            'id': {
                'type': 'string'
            }
        }
    }
};
exports.ms3Object = {
    'name': 'mySchema',
    'type': 'object',
    'properties': [
        {
            'name': 'name',
            'type': 'string',
        },
        {
            'name': 'type',
            'type': 'string',
        },
        {
            'name': 'id',
            'type': 'string',
        }
    ],
    '__id': 'uuid'
};
//# sourceMappingURL=oas-schemas-to-dataTypes.js.map