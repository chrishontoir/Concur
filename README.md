# **concur**
A JavaScript validator

## **Install**
```
$ npm install @chrishontoir/concur
```
---
---
## **Use**
```
const concur = new Concur();
```
---
### **Valid**
```
concur.schema({
    apple: concur.number().max(5).required(),
    animals: concur.array({
        frog: concur.boolean()
    })
});
```

```
concur.validate({
    apple: 3,
    animals: [
        {
            frog: true
        },
        {
            frog: false
        }
    ]
});
```

```
concur.status = 'VALID'
```
---
### **Invalid**
```
concur.schema({
    banana: concur.number().min(2).required()
    vehicles: concur.object({
        car: concur.string(),
        bus: concur.string().required()
    })
});

concur.validate({
    banana: 1,
    vehicles: {
        car: 'blue',
        van: 'red'
    }
});
```

```
concur.status = 'INVALID'
concur.reason = [
        'banana: INVALID MIN(2)',
        'vehicles.bus: REQUIRED',
        'vehicles.van: UNKNOWN'
]
```
---
---
## **Types**

### **General**
- `.required()`
- `.iterable()`
- `.options()`

### **Array**
A new array must be given an object as its argument. If you need to validate an array of non object values then create it as the type you want to validate and call .iterable()

[1, 2, 3]
`concur.number().iterable()`

### **Boolean**
- `.true()`
- `.false()`

### **Date**
WIP...

### **Number**
- `.min()`
- `.max()`
- `.decimals()`
- `.multipleOf()`
- `.odd()`
- `.even()`
- `.sum()`

### **Object**
No specific functions.

### **String**
- `.min()`
- `.max()`