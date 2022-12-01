// GET ONE
export const getOne = (model) => async(req, res) => {
    try {
        const results = await model.findById(req.params.id);
        if (!results) {
            return res.status(400).json({ status: 0, message: 'Record not found !' }).end();
        }
        res.status(200).json({ status: 1, results });
    } catch (error) {
        console.log(error);
        res.status(400).end();
    }
};

// GET MANY

export const getMany = (model) => async(req, res) => {
    try {
        const results = await model.find();
        if (!results) {
            return res.status(400).end();
        }
        res.status(200).json({ status: 1, results });
    } catch (error) {
        console.log(error);
        res.status(400).end();
    }
};

// UPDATE ONE
export const updateOne = (model) => async(req, res) => {

    try {
        const results = await model.findByIdAndUpdate(
            req.params.id,
            req.body.changes, { new: true }
        );
        res.status(200).json({ status: 1, results, message: 'Record Updated successfully ! ' });
    } catch (error) {
        console.log(error);
        res.status(400).end();
    }
};

// CREATE ONE
export const createOne = (model) => async(req, res) => {
    //const createdBy = req.user._id;
    try {
        const results = await model.create({...req.body });
        res.status(200).json({ status: 1, message: `Record with name ${results.name} created successfully` });
    } catch (error) {
        console.log(error);
        res.status(400).end;
    }
};

export const removeOne = (model) => async(req, res) => {
    const _id = req.params.id
    try {
        const results = await model.findOneAndRemove({
            _id
        });
        if (!results) {
            return res.status(400).json({ status: 0, message: `Record with id ${_id} is not found` }).end();
        }
        return res.status(200).json({ status: 1, message: `Record with id ${_id} remove with success` });
    } catch (error) {
        console.log(error);
        res.send(400).end();
    }
};

export const removeMany = (model) => async(req, res) => {
    try {
        const results = await model.deleteMany({
            _id: [...req.body],
        });
        if (!results) {
            return res.status(400).end();
        }

        return res.status(200).json({ status: 1, results });
    } catch (error) {
        console.log(error);
        res.send(400).end();
    }
};

export const crudControlers = (model) => ({
    getOne: getOne(model),
    getMany: getMany(model),
    createOne: createOne(model),
    updateOne: updateOne(model),
    removeOne: removeOne(model),
    removeMany: removeMany(model),
});