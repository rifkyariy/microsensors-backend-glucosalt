import { createClient } from '@supabase/supabase-js';
import { InfluxDB, Point } from '@influxdata/influxdb-client';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const influxUrl = process.env.INFLUXDB_URL || 'http://localhost:8086';
const influxToken = process.env.INFLUXDB_TOKEN || '';
const influxOrg = process.env.INFLUXDB_ORG || '';
const influxBucket = process.env.INFLUXDB_BUCKET || 'health_metrics';
const influxDB = new InfluxDB({ url: influxUrl, token: influxToken });

// Target user to seed data for
const TARGET_USER_ID = '64a6f31f-68c4-4122-b406-55dc2d75703e';
const TARGET_USER_EMAIL = 'rifkyari@gmail.com';

// Common foods for food database
const foodDatabase = [
  { name: 'Apple', calories: 95, carbs: 25, protein: 0.5, fat: 0.3, serving_size: '1 medium (182g)' },
  { name: 'Banana', calories: 105, carbs: 27, protein: 1.3, fat: 0.4, serving_size: '1 medium (118g)' },
  { name: 'Orange', calories: 62, carbs: 15, protein: 1.2, fat: 0.2, serving_size: '1 medium (131g)' },
  { name: 'Chicken Breast', calories: 165, carbs: 0, protein: 31, fat: 3.6, serving_size: '100g' },
  { name: 'Brown Rice', calories: 216, carbs: 45, protein: 5, fat: 1.8, serving_size: '1 cup cooked' },
  { name: 'Broccoli', calories: 55, carbs: 11, protein: 3.7, fat: 0.6, serving_size: '1 cup (156g)' },
  { name: 'Salmon', calories: 206, carbs: 0, protein: 22, fat: 13, serving_size: '100g' },
  { name: 'Eggs', calories: 78, carbs: 0.6, protein: 6.3, fat: 5.3, serving_size: '1 large' },
  { name: 'Milk', calories: 149, carbs: 12, protein: 8, fat: 8, serving_size: '1 cup (244g)' },
  { name: 'Greek Yogurt', calories: 100, carbs: 6, protein: 17, fat: 0.7, serving_size: '1 container (170g)' },
  { name: 'Oatmeal', calories: 158, carbs: 27, protein: 6, fat: 3.2, serving_size: '1 cup cooked' },
  { name: 'Almonds', calories: 164, carbs: 6, protein: 6, fat: 14, serving_size: '1 oz (28g)' },
  { name: 'Sweet Potato', calories: 112, carbs: 26, protein: 2, fat: 0.1, serving_size: '1 medium (114g)' },
  { name: 'Spinach', calories: 7, carbs: 1.1, protein: 0.9, fat: 0.1, serving_size: '1 cup raw' },
  { name: 'Avocado', calories: 322, carbs: 17, protein: 4, fat: 29, serving_size: '1 whole (201g)' },
  { name: 'Whole Wheat Bread', calories: 69, carbs: 12, protein: 3.6, fat: 0.9, serving_size: '1 slice' },
  { name: 'Pasta', calories: 221, carbs: 43, protein: 8, fat: 1.3, serving_size: '1 cup cooked' },
  { name: 'Tuna', calories: 128, carbs: 0, protein: 28, fat: 1.3, serving_size: '100g canned' },
  { name: 'Tomato', calories: 22, carbs: 4.8, protein: 1.1, fat: 0.2, serving_size: '1 medium (123g)' },
  { name: 'Carrot', calories: 25, carbs: 6, protein: 0.6, fat: 0.1, serving_size: '1 medium (61g)' },
  { name: 'Cucumber', calories: 16, carbs: 3.6, protein: 0.7, fat: 0.1, serving_size: '1 cup sliced' },
  { name: 'Bell Pepper', calories: 31, carbs: 6, protein: 1.3, fat: 0.4, serving_size: '1 medium (119g)' },
  { name: 'Quinoa', calories: 222, carbs: 39, protein: 8, fat: 3.6, serving_size: '1 cup cooked' },
  { name: 'Black Beans', calories: 227, carbs: 41, protein: 15, fat: 0.9, serving_size: '1 cup cooked' },
  { name: 'Peanut Butter', calories: 188, carbs: 7, protein: 8, fat: 16, serving_size: '2 tbsp' },
  { name: 'Honey', calories: 64, carbs: 17, protein: 0.1, fat: 0, serving_size: '1 tbsp' },
  { name: 'Coffee', calories: 2, carbs: 0, protein: 0.3, fat: 0, serving_size: '1 cup black' },
  { name: 'Green Tea', calories: 2, carbs: 0, protein: 0.5, fat: 0, serving_size: '1 cup' },
  { name: 'Olive Oil', calories: 119, carbs: 0, protein: 0, fat: 14, serving_size: '1 tbsp' },
  { name: 'Cheese', calories: 113, carbs: 0.9, protein: 7, fat: 9, serving_size: '1 oz (28g)' },
];

const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];

// --- TYPES ---
type SupabaseUser = {
  id: string;
  email: string;
  name?: string;
  age?: number;
  gender?: string;
  height?: number;
};

type FoodItem = {
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  serving_size?: string;
};

type BMIRecord = {
  user_id: string;
  weight: number;
  bmi: number;
  recorded_at: string;
};

type DietRecord = {
  user_id: string;
  meal_type: string;
  food_name: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  recorded_at: string;
};

async function seedData() {
  console.log('🌱 Starting database seeding...\n');

  try {
    // 1. Seed Food Database
    console.log('📦 Seeding food database...');
    const { data: foods, error: foodError } = await supabase
      .from('food_database')
      .upsert(foodDatabase, { onConflict: 'name' })
      .select();

    if (foodError) throw foodError;
    console.log(`✅ Added ${foods?.length || 0} foods to database\n`);

    // 2. Fetch target user
    console.log('👥 Fetching target user...');
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .eq('id', TARGET_USER_ID)
      .eq('email', TARGET_USER_EMAIL);

    if (usersError) throw usersError;

    if (!users || users.length === 0) {
      console.error(`❌ User not found with ID: ${TARGET_USER_ID} and email: ${TARGET_USER_EMAIL}`);
      console.log('Make sure the user is registered via /auth/register first.');
      return;
    }

    console.log(`✅ Found user: ${users[0].email}\n`);

    // Ensure user has height set (required for BMI calculation)
    const user = users[0];
    if (!user.height) {
      // Set explicit values requested: age 23, height 174.50 cm (convert to meters for BMI calc)
      console.log('⚠️  User height not set, updating to requested values (174.50cm, age 23)...');
      const desiredHeightCm = 174.5;
      const desiredHeightMeters = desiredHeightCm / 100; // 1.745 meters
      const { error: updateError } = await supabase
        .from('users')
        .update({ height: desiredHeightMeters, gender: 'male', age: 23 })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // re-fetch the user record to make sure we have the stored/typed value
      const { data: refreshedUsers, error: refreshErr } = await supabase.from('users').select('*').eq('id', user.id);
      if (refreshErr) throw refreshErr;
      if (refreshedUsers && refreshedUsers.length > 0) {
        user.height = refreshedUsers[0].height;
        user.gender = refreshedUsers[0].gender || 'male';
        user.age = refreshedUsers[0].age || 23;
      } else {
        user.height = desiredHeightMeters;
        user.gender = 'male';
        user.age = 23;
      }
    }

    // 3. Seed BMI Records (30 days of data)
    console.log('📊 Seeding BMI records...');
  const bmiRecords: BMIRecord[] = [];
    
    for (const user of users) {
      const baseWeight = user.gender === 'male' ? 75 : 60;

      // Use requested baseline height (174.50 cm => 1.745 m) for BMI calculation where possible
      const requestedHeightCm = 174.5;
      const requestedHeightMeters = requestedHeightCm / 100; // 1.745
      const heightMeters = typeof user.height === 'string' ? parseFloat(user.height) : Number(user.height);
      const effectiveHeight = (heightMeters && !Number.isNaN(heightMeters) && heightMeters > 0) ? heightMeters : requestedHeightMeters;

      // Ensure age is set to 23 as requested
      user.age = user.age || 23;

      for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);

        // Simulate weight variation
        const weight = baseWeight + (Math.random() * 4 - 2);
        const bmi = weight / (effectiveHeight * effectiveHeight);

        bmiRecords.push({
          user_id: user.id,
          weight: parseFloat(weight.toFixed(2)),
          bmi: parseFloat(bmi.toFixed(2)),
          recorded_at: date.toISOString(),
        });
      }
    }

    const { error: bmiError } = await supabase.from('bmi_records').insert(bmiRecords);
    if (bmiError) throw bmiError;
    console.log(`✅ Added ${bmiRecords.length} BMI records\n`);

    // 4. Seed Diet Records (3 meals per day for 30 days)
    console.log('🍽️  Seeding diet records...');
  const dietRecords: DietRecord[] = [];

    for (const user of users) {
      for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);

        // Breakfast
        const breakfast = foodDatabase[Math.floor(Math.random() * 10)];
        dietRecords.push({
          user_id: user.id,
          meal_type: 'breakfast',
          food_name: breakfast.name,
          calories: breakfast.calories,
          carbs: breakfast.carbs,
          protein: breakfast.protein,
          fat: breakfast.fat,
          recorded_at: new Date(date.setHours(8, 0, 0, 0)).toISOString(),
        });

        // Lunch
        const lunch = foodDatabase[10 + Math.floor(Math.random() * 10)];
        dietRecords.push({
          user_id: user.id,
          meal_type: 'lunch',
          food_name: lunch.name,
          calories: lunch.calories,
          carbs: lunch.carbs,
          protein: lunch.protein,
          fat: lunch.fat,
          recorded_at: new Date(date.setHours(13, 0, 0, 0)).toISOString(),
        });

        // Dinner
        const dinner = foodDatabase[5 + Math.floor(Math.random() * 10)];
        dietRecords.push({
          user_id: user.id,
          meal_type: 'dinner',
          food_name: dinner.name,
          calories: dinner.calories,
          carbs: dinner.carbs,
          protein: dinner.protein,
          fat: dinner.fat,
          recorded_at: new Date(date.setHours(19, 0, 0, 0)).toISOString(),
        });
      }
    }

    const { error: dietError } = await supabase.from('diet_records').insert(dietRecords);
    if (dietError) throw dietError;
    console.log(`✅ Added ${dietRecords.length} diet records\n`);

    // 5. Seed Health Metrics to InfluxDB (every 30 minutes for 7 days)
    console.log('❤️  Seeding health metrics to InfluxDB...');
    const writeApi = influxDB.getWriteApi(influxOrg, influxBucket);
    let metricCount = 0;

    for (const user of users) {
      for (let day = 7; day >= 0; day--) {
        for (let hour = 0; hour < 24; hour++) {
          for (let minute = 0; minute < 60; minute += 30) {
            const timestamp = new Date();
            timestamp.setDate(timestamp.getDate() - day);
            timestamp.setHours(hour, minute, 0, 0);

            // Generate realistic health metrics
            const baseHeartRate = 70;
            const heartRate = baseHeartRate + Math.floor(Math.random() * 30) - 10; // 60-90
            const bloodOxygen = 95 + Math.random() * 5; // 95-100

            const point = new Point('health_metrics')
              .tag('user_id', user.id)
              .tag('device_id', `ESP32_${user.id.substring(0, 8)}`)
              .floatField('heart_rate', heartRate)
              .floatField('blood_oxygen', parseFloat(bloodOxygen.toFixed(1)))
              .timestamp(timestamp);

            writeApi.writePoint(point);
            metricCount++;
          }
        }
      }
    }

    await writeApi.flush();
    await writeApi.close();
    console.log(`✅ Added ${metricCount} health metric data points\n`);

    console.log('🎉 Database seeding completed successfully!\n');
    console.log('📋 Summary:');
    console.log(`   - User: ${users[0].email} (${users[0].id})`);
    console.log(`   - Foods: ${foods?.length || 0}`);
    console.log(`   - BMI Records: ${bmiRecords.length}`);
    console.log(`   - Diet Records: ${dietRecords.length}`);
    console.log(`   - Health Metrics: ${metricCount}\n`);
    console.log('� Use this user ID for ESP32 and API requests:\n');
    console.log(`   USER_ID: ${users[0].id}`);
    console.log(`   EMAIL: ${users[0].email}\n`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedData();
