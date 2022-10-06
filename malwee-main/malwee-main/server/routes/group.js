const Joi = require('joi');
const md5 = require('../utils/md5-pass');
const knl = require('../knl');

knl.post('group', async(req, resp) => {
    const schema = Joi.object({
        produto : Joi.string().min(1).max(50).required(),
        descricao : Joi.string().min(1).max(200).required()
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.Grupo.findAll({
        where : {
            produto : req.body.produto
        }
    });

    knl.createException('0006', '', !knl.objects.isEmptyArray(result));

    const user = knl.sequelize().models.Grupo.build({
        produto : req.body.produto,
        descricao : req.body.descricao
    });

    await user.save();
    resp.end();
});

knl.get('group', async(req, resp) => {
    const user = await knl.sequelize().models.Grupo.findAll();
    resp.send(user);
    resp.end();
});


knl.delete('group', async(req, resp) => {

    knl.sequelize().models.Grupo.destroy({
        where : {
            idGrupo : req.body.idGrupo
        }
    });
    resp.end();
});