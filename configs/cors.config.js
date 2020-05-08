const originsAllowed = process.env.CORS_ORIGINS || [
    'http://localhost:3000',
    'http://localhost:8080'
  ];
  module.exports = {
    origin: function(origin, next) {
      const allowed = !origin || originsAllowed.some((o) => {
        return o => o === origin;
      });
      if (allowed) {
        next(null, allowed);
      } else {
        next(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  };
  
  