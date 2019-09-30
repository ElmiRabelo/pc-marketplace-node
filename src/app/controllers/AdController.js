import Ad from "../models/Ad";

class AdController {
  async index(req, res) {
    const filters = {};

    if (req.query.price_min || req.query.price_max) {
      filters.price = {};

      if (req.query.price_min) {
        filters.price.$gte = req.query.price_min;
      }
      if (req.query.price_max) {
        filters.price.$lte = req.query.price_max;
      }
    }
    if (req.query.title) {
      filters.title = new RegExp(req.query.title, "i");
    }

    //utiliza da dependencia de mongoose-paginate, o primeiro parametro são os filtros, o segundo é a configuração
    const ads = await Ad.paginate(filters, {
      page: req.query.page || 1,
      populate: ["author"],
      limit: 20,
      sort: "-createdAt"
    });

    return res.json(ads);
  }

  async show(req, res) {
    const ad = await Ad.findById(req.params.id);

    return res.json(ad);
  }

  async store(req, res) {
    const ad = await Ad.create({ ...req.body, author: req.userId });

    return res.json(ad);
  }

  async update(req, res) {
    //econtra o ad pelo ad e atualiza, o new serve para informa que desejo a informação atualizada ao fim do processo
    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.json(ad);
  }

  async destroy(req, res) {
    await Ad.findByIdAndDelete(req.params.id);

    return res.send("Ad foi excluído com sucesso");
  }
}

export default new AdController();
