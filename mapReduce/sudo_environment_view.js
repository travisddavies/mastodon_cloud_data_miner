const fs = require('fs')

const mapFx = function (doc) {
   
    new_state_name = doc.state_name.replace(/ *\([^)]*\) */g, "").toLowerCase().trim()
    protected_area = doc.protected_areas_year_ended_30_june_protected_areas_total_ha
    if (protected_area == 'null'){
      protected_area = 0

    }
    
    total_land = doc.land_area_ha
    if (total_land == 'null'){
      total_land = 0

    }

    solar_intl_pc = doc.slr_instlltns_accmltve_ttl_2001_incrse_pnl_frm_prvs_yr_pc
    if (solar_intl_pc == 'null'){
      solar_intl_pc = 0

    }

    emit([new_state_name], [protected_area, total_land, solar_intl_pc, 1])

    
}

const views = {
  "views": {
    "sudo_environment_filter": {
      "map": mapFx.toString(),
      "reduce": "_sum"
    }
  }
}

fs.writeFileSync('sudo_environment_view.json', JSON.stringify(views))