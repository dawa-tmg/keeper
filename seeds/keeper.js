exports.seed = async function(knex) {
  await knex('keeper').del()
  await knex('keeper').insert([
    {
      title: '🍃 The Wisdom of Trees', 
      note: '🍃 The Wisdom of TreesA tree never rushes, yet it grows strong and tall. Through storms and sunshine, it stands rooted, quietly teaching us resilience. Its leaves fall, but it does not despair—because it knows spring will come again. In silence, trees remind us: patience is not weakness, but strength in disguise.'
    },
    {
      title: '🌊 The Ocean’s Lesson', 
      note: 'The ocean is vast and mysterious—calm on some days, wild on others. It reminds us that emotions, like waves, rise and fall. No storm lasts forever, and no calm stays unchanged. The ocean whispers: accept the tides of life, for they are part of your journey.'
    },
    {
      title: '✨ Stars in the Night', 
      note: 'When the sky turns dark, the stars appear. Even the smallest star can pierce through the deep night with its light. Life is the same—your light, no matter how small, can guide someone through their darkness. Shine, even when the night feels endless.'
    },
    {
      title: '🕊️ The Gift of Stillness',
      note: 'In a world that moves too fast, stillness is a forgotten treasure. A quiet walk, a slow breath, or simply sitting in peace can heal the restless mind. Stillness is not emptiness—it is where the soul finds clarity.'
    }
  ]);
};
