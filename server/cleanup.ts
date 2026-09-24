import { db } from './db';
import { contentBlocks } from './db/schema';
import { inArray } from 'drizzle-orm';

const keysToRemove = [
  'home_why_1_title', 'home_why_1_copy', 'home_why_2_title', 'home_why_2_copy', 
  'home_why_3_title', 'home_why_3_copy', 'home_why_4_title', 'home_why_4_copy',
  'home_review_1_quote', 'home_review_1_name', 'home_review_1_detail',
  'home_review_2_quote', 'home_review_2_name', 'home_review_2_detail',
  'home_review_3_quote', 'home_review_3_name', 'home_review_3_detail',
  'chairman_stat_1_val', 'chairman_stat_1_lbl',
  'chairman_stat_2_val', 'chairman_stat_2_lbl',
  'chairman_stat_3_val', 'chairman_stat_3_lbl',
  'home_partner_amazon_desc', 'home_partner_etisalat_desc', 'home_partner_fbc_desc',
  'home_partner_arkan_desc', 'home_partner_archplan_desc', 'home_partner_dma_desc',
  'home_partner_iec_desc', 'home_partner_adc_desc', 'home_partner_hafez_desc',
  'home_partner_yba_desc', 'home_partner_ace_desc', 'home_partner_sag_desc',
  'home_partner_regus_desc', 'home_partner_raya_desc', 'home_partner_electra_desc',
  'home_partner_healthy_desc'
];

async function cleanup() {
  console.log('Cleaning up deprecated keys...');
  const res = await db.delete(contentBlocks).where(inArray(contentBlocks.id, keysToRemove));
  console.log('Done!');
  process.exit(0);
}

cleanup();
