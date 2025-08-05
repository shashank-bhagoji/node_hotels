
    type: Number,
    required: true
  }
});

// Create the Person model
const Person = mongoose.model('Person', personSchema);
