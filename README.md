# **concur**
A JavaScript validator

## **Install**
```
$ npm install @chrishontoir/concur
```

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
{ status: 'VALID' }
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
{ 
    status: 'INVALID',
    reason: [
        'banana: INVALID MIN(2)',
        'vehicles.bus: REQUIRED',
        'vehicles.van: UNKNOWN'
    ]
}
```
