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
    apple: concur.number().max(5).required()
});

concur.validate({
    apple: 3
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
});

concur.validate({
    banana: 1
});
```

```
{ status: 'INVALID', reason: 'banana: INVALID MIN(2) }
```
