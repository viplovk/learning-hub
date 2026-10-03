import { Subject } from '../../types';

export const kas302Subject: Subject = {
  id: 'kas302',
  code: 'KAS-302',
  name: 'Mathematics-IV',
  shortName: 'M-IV',
  semester: 3,
  credits: 4,
  type: 'CORE_THEORY',
  hasLab: false,
  description: 'Partial differential equations, separation of variables, curve fitting, correlation & regression, probability distributions, and hypothesis testing.',
  color: '#991b1b',
  referenceBooks: [
    'Advanced Engineering Mathematics by Erwin Kreyszig',
    'Higher Engineering Mathematics by B.S. Grewal',
    'Applied Numerical Analysis by Gerald & Wheatley'
  ],
  units: [
    {
      id: 'kas302-u1',
      unitNumber: 1,
      title: 'Partial Differential Equations (PDE)',
      description: "Origin of PDE, Lagrange's linear PDE of first order (Pp + Qq = R), Charpit's method, and linear PDE with constant coefficients.",
      subjectId: 'kas302',
      pyqCount: 25,
      topics: [
        {
          id: 'm4-lagrange-pde',
          name: "Lagrange's Linear PDE & Method of Multipliers",
          unitId: 'kas302-u1',
          subjectId: 'kas302',
          difficulty: 'MEDIUM',
          importance: 'CRITICAL',
          estimatedMinutes: 50,
          prerequisites: ['Partial Derivatives (p = dz/dx, q = dz/dy)', 'Total Differentials'],
          nextTopics: ["Charpit's Method", 'Applications of PDEs'],
          quickExplanation: "Lagrange's linear partial differential equation has standard form Pp + Qq = R. Solved using auxiliary equations: dx/P = dy/Q = dz/R.",
          deepExplanation: "Find two independent integral solutions u(x,y,z)=c1 and v(x,y,z)=c2. Methods: Grouping (two fractions at a time), or Method of Multipliers (l, m, n such that lP + mQ + nR = 0, which implies l*dx + m*dy + n*dz = 0, directly integrable). General solution is phi(u, v) = 0.",
          whyItMatters: 'Governs physical systems including fluid continuity equations, acoustics, and quantum mechanics.',
          coreConceptsList: [
            'Standard form: Pp + Qq = R where p = dz/dx, q = dz/dy',
            'Auxiliary equations: dx/P = dy/Q = dz/R',
            'Method of Multipliers condition: lP + mQ + nR = 0',
            'General solution: phi(u, v) = 0 or u = f(v)'
          ],
          workedExample: {
            problem: "Solve: x(y^2 - z^2)p + y(z^2 - x^2)q = z(x^2 - y^2).",
            stepByStepSolution: [
              "Auxiliary: dx/[x(y^2-z^2)] = dy/[y(z^2-x^2)] = dz/[z(x^2-y^2)]",
              "Set 1 Multipliers (1/x, 1/y, 1/z): Denominator = (y^2-z^2)+(z^2-x^2)+(x^2-y^2) = 0 -> dx/x + dy/y + dz/z = 0 -> x*y*z = c1",
              "Set 2 Multipliers (x, y, z): Denominator = x^2(y^2-z^2)+y^2(z^2-x^2)+z^2(x^2-y^2) = 0 -> x dx + y dy + z dz = 0 -> x^2 + y^2 + z^2 = c2",
              "General Solution: phi(x*y*z, x^2 + y^2 + z^2) = 0"
            ],
            explanation: "Multipliers cause the numerator to be an exact differential."
          },
          commonMistakes: ['Choosing multipliers where lP + mQ + nR does not identically equal 0.'],
          examPerspective: {
            twoMarks: 'Write auxiliary equations for Lagrange PDE (y+z)p + (z+x)q = x+y.',
            fiveMarks: 'Solve by method of multipliers: (y-z)p + (z-x)q = x-y.',
            tenMarks: 'Solve x^2(y-z)p + y^2(z-x)q = z^2(x-y) showing step-by-step integrals.',
            highYieldKeywords: ["Lagrange's PDE", "Auxiliary Equations", "Method of Multipliers"]
          },
          activeRecallPrompt: {
            question: "What must lP + mQ + nR equal for (l, m, n) to be valid multipliers?",
            idealAnswer: 'It must identically equal zero (lP + mQ + nR = 0).',
            keyPoints: ['Denominator equals zero']
          },
          feynmanPrompt: 'Explain multipliers like balancing opposing forces to cancel everything out to zero.',
          examWeightage: { twoMarkFreq: 8, fiveMarkFreq: 7, tenMarkFreq: 8, frequentlyAsked: true }
        }
      ]
    },
    {
      id: 'kas302-u2',
      unitNumber: 2,
      title: 'Applications of Partial Differential Equations',
      description: 'Method of separation of variables for solving second-order PDEs: 1D Wave equation (vibrating string), 1D Heat conduction equation, and 2D Laplace equation.',
      subjectId: 'kas302',
      pyqCount: 22,
      topics: [
        {
          id: 'm4-sep-variables',
          name: 'Method of Separation of Variables & 1D Wave Equation',
          unitId: 'kas302-u2',
          subjectId: 'kas302',
          difficulty: 'HARD',
          importance: 'CRITICAL',
          estimatedMinutes: 55,
          prerequisites: ['Second Order PDEs', 'Fourier Series'],
          nextTopics: ['1D Heat Conduction Equation'],
          quickExplanation: 'Assumes the solution u(x, t) can be factored into a product of single-variable functions: u(x, t) = X(x) * T(t). Substituting into the PDE separates variables onto opposite sides.',
          deepExplanation: '1D Wave Equation: d^2 u / dt^2 = c^2 (d^2 u / dx^2). Substituting u = X(x)T(t) gives T\'\'/(c^2 T) = X\'\'/X = -k^2. Boundary conditions (ends fixed: u(0, t) = 0, u(L, t) = 0) yield sinusoidal spatial eigenfunctions X(x) = sin(n*pi*x / L). Fourier coefficients determine initial displacement/velocity matching.',
          whyItMatters: 'Acoustic wave propagation, vibration analysis of structures, and electromagnetic wave guides.',
          coreConceptsList: [
            'Separation hypothesis: u(x, t) = X(x) * T(t)',
            'Separation constant choice: -k^2 (for periodic oscillatory physical solutions)',
            'Boundary value conditions at x = 0 and x = L',
            'Superposition principle and Fourier series coefficients'
          ],
          visualDiagram: `String fixed at x = 0 and x = L:
  u(x, t)
    ^
    |      /\\        /\\
    |     /  \\      /  \\
----+----+----+----+----+---> x
   x=0         L/2       x=L
PDE: d^2 u/dt^2 = c^2 (d^2 u/dx^2)`,
          visualDiagramType: 'flowchart',
          workedExample: {
            problem: 'Solve 1D Wave equation d^2 u/dt^2 = c^2 (d^2 u/dx^2) with u(0, t) = 0, u(L, t) = 0.',
            stepByStepSolution: [
              "Let u(x, t) = X(x)T(t). Then X*T'' = c^2 * X''*T -> X''/X = T''/(c^2 T) = -p^2",
              "X'' + p^2 X = 0 -> X(x) = C1 cos(px) + C2 sin(px)",
              "Boundary condition u(0, t) = 0 -> C1 = 0. u(L, t) = 0 -> C2 sin(pL) = 0 -> p = n*pi/L",
              "T'' + (n*pi*c/L)^2 T = 0 -> T(t) = C3 cos(n*pi*c*t/L) + C4 sin(n*pi*c*t/L)",
              "General Solution: u(x, t) = sum [sin(n*pi*x/L) * (An cos(n*pi*c*t/L) + Bn sin(n*pi*c*t/L))]"
            ],
            explanation: 'The separation constant must be negative to obtain non-trivial vibrating solutions.'
          },
          commonMistakes: ['Choosing a positive separation constant (+p^2) which leads to non-physical exponential explosions.'],
          examPerspective: {
            twoMarks: 'State the three possible forms of solutions obtained by separation of variables for the 1D Wave equation.',
            fiveMarks: 'Derive the general solution of the 1D heat equation du/dt = c^2 d^2 u/dx^2.',
            tenMarks: 'Solve vibrating string problem with initial displacement f(x) and zero initial velocity.',
            highYieldKeywords: ['Separation of Variables', '1D Wave Equation', 'Boundary Conditions', 'Eigenvalues']
          },
          activeRecallPrompt: {
            question: 'Why must the separation constant be chosen as -p^2 (negative) for a vibrating string?',
            idealAnswer: 'Because physical vibrations are periodic and bounded, which requires harmonic trigonometric functions (sin and cos) rather than exponential functions.',
            keyPoints: ['Periodic bounded motion', 'Trigonometric eigenfunctions']
          },
          feynmanPrompt: 'Explain separation of variables like splitting a recipe into time instructions and spatial oven temperature.',
          examWeightage: { twoMarkFreq: 6, fiveMarkFreq: 6, tenMarkFreq: 8, frequentlyAsked: true }
        }
      ]
    },
    {
      id: 'kas302-u3',
      unitNumber: 3,
      title: 'Statistical Techniques - I',
      description: 'Moments, Skewness, Kurtosis, Curve fitting by method of least squares (Straight line, Parabola, Exponential), Karl Pearson correlation coefficient, and Lines of Regression.',
      subjectId: 'kas302',
      pyqCount: 24,
      topics: [
        {
          id: 'm4-correlation-regression',
          name: 'Karl Pearson Correlation & Lines of Regression',
          unitId: 'kas302-u3',
          subjectId: 'kas302',
          difficulty: 'MEDIUM',
          importance: 'CRITICAL',
          estimatedMinutes: 50,
          prerequisites: ['Mean and Standard Deviation', 'Covariance'],
          nextTopics: ['Probability Distributions'],
          quickExplanation: 'Correlation measures the strength and direction of linear association between two variables (-1 <= r <= +1). Regression lines estimate the value of one variable given the other.',
          deepExplanation: 'Karl Pearson coefficient: r = Cov(X, Y) / (sigma_x * sigma_y). Regression of Y on X: (y - y_bar) = byx * (x - x_bar), where byx = r * (sigma_y / sigma_x). Regression of X on Y: (x - x_bar) = bxy * (y - y_bar), where bxy = r * (sigma_x / sigma_y). Property: r = +- sqrt(byx * bxy). Both regression coefficients must share the same algebraic sign as r.',
          whyItMatters: 'Machine learning linear regression, econometrics, and data analytics rely directly on these formulas.',
          coreConceptsList: [
            'Correlation bounds: -1 <= r <= +1',
            'Regression coefficient: byx = r * (sigma_y / sigma_x)',
            'Geometric mean property: r = sqrt(byx * bxy)',
            'Intersection point of regression lines: (x_bar, y_bar)'
          ],
          visualDiagram: `Lines of Regression intersect at (x_bar, y_bar):
    Y ^           / (Regression of X on Y)
      |          /
      |    +----* (x_bar, y_bar)
      |   /    /
      |  /    /  (Regression of Y on X)
------+------+---------> X`,
          visualDiagramType: 'architecture',
          workedExample: {
            problem: 'Given byx = 0.8 and bxy = 0.45. Find correlation coefficient r.',
            stepByStepSolution: [
              'Formula: r = sqrt(byx * bxy)',
              'r = sqrt(0.8 * 0.45) = sqrt(0.36) = 0.6',
              'Since both byx and bxy are positive, r = +0.6'
            ],
            explanation: 'Both regression coefficients and correlation coefficient always share the same sign.'
          },
          commonMistakes: ['Assigning opposite signs to byx and bxy (mathematically impossible).'],
          examPerspective: {
            twoMarks: 'State the relation between correlation coefficient r and regression coefficients byx, bxy.',
            fiveMarks: 'Prove that the correlation coefficient is the geometric mean of regression coefficients.',
            tenMarks: 'Given bivariate data table of X and Y, calculate means, standard deviations, r, and both regression equations.',
            highYieldKeywords: ['Correlation r', 'Regression Lines', 'byx and bxy', 'Geometric Mean']
          },
          activeRecallPrompt: {
            question: 'At which point do the two lines of regression always intersect?',
            idealAnswer: 'At the point of means: (x_bar, y_bar).',
            keyPoints: ['Mean of X and Mean of Y']
          },
          feynmanPrompt: 'Explain correlation like how closely shoe size predicts height.',
          examWeightage: { twoMarkFreq: 8, fiveMarkFreq: 6, tenMarkFreq: 7, frequentlyAsked: true }
        }
      ]
    },
    {
      id: 'kas302-u4',
      unitNumber: 4,
      title: 'Statistical Techniques - II (Probability Distributions)',
      description: 'Random variables, Probability mass/density functions, Mathematical expectation, Binomial distribution, Poisson distribution, and Normal distribution properties.',
      subjectId: 'kas302',
      pyqCount: 26,
      topics: [
        {
          id: 'm4-normal-dist',
          name: 'Normal Distribution & Standard Normal Variate (Z-Score)',
          unitId: 'kas302-u4',
          subjectId: 'kas302',
          difficulty: 'MEDIUM',
          importance: 'CRITICAL',
          estimatedMinutes: 50,
          prerequisites: ['Continuous Random Variables', 'Integration'],
          nextTopics: ['Testing of Hypothesis (t-test, Chi-square)'],
          quickExplanation: 'The Normal Distribution is a continuous symmetric bell curve defined by mean mu and standard deviation sigma. Solved by transforming X into Z = (X - mu) / sigma.',
          deepExplanation: 'Total area under the normal curve is 1. Symmetric about Z = 0: P(Z <= 0) = 0.5. Mean = Median = Mode. Key intervals: mu +- 1 sigma = 68.26%, mu +- 2 sigma = 95.44%, mu +- 3 sigma = 99.74%. Z-tables provide cumulative area phi(z).',
          whyItMatters: 'Central Limit Theorem foundations, experimental error modeling, and ML feature standardization.',
          coreConceptsList: [
            'Transformation formula: Z = (X - mu) / sigma',
            'Symmetry property: Area(0 to z) = Area(-z to 0)',
            'Standardized parameters: Mean = 0, Variance = 1'
          ],
          visualDiagram: `         Symmetric Bell Curve
               Z = 0 (Mean = Median = Mode)
                  |
             _--'""'--_
           /'          '\\
         /'              '\\
       /'                  '\\
---+--+--------+--------+--+---> Z
  -3 -2       0        +2 +3`,
          visualDiagramType: 'flowchart',
          workedExample: {
            problem: 'Mean = 60, StdDev = 10. Find P(X > 75) given Area(0 to 1.5) = 0.4332.',
            stepByStepSolution: [
              'Z = (75 - 60) / 10 = 1.5',
              'P(X > 75) = P(Z > 1.5) = 0.5 - 0.4332 = 0.0668 (or 6.68%)'
            ],
            explanation: 'Symmetry allows subtracting from 0.5 for the upper tail.'
          },
          commonMistakes: ['Subtracting from 1 instead of 0.5 when calculating single-tail area.'],
          examPerspective: {
            twoMarks: 'State four properties of the normal distribution curve.',
            fiveMarks: 'Derive the mean and variance of a Poisson or Binomial distribution.',
            tenMarks: 'Solve a 3-part normal distribution examination numerical using Z tables.',
            highYieldKeywords: ['Normal Curve', 'Standard Normal Variate Z', 'Bell-shaped', 'Mean = Median = Mode']
          },
          activeRecallPrompt: {
            question: 'What are the mean and variance of the standard normal distribution?',
            idealAnswer: 'Mean = 0 and Variance = 1.',
            keyPoints: ['Mean 0', 'Variance 1']
          },
          feynmanPrompt: 'Explain the bell curve like how Section C student heights naturally cluster around the average.',
          examWeightage: { twoMarkFreq: 7, fiveMarkFreq: 6, tenMarkFreq: 7, frequentlyAsked: true }
        }
      ]
    },
    {
      id: 'kas302-u5',
      unitNumber: 5,
      title: 'Statistical Techniques - III (Hypothesis Testing)',
      description: 'Sampling theory, Null hypothesis (H0), Alternative hypothesis (H1), Level of significance, Critical region, Student t-test, F-test (ANOVA), and Chi-Square test for Goodness of Fit.',
      subjectId: 'kas302',
      pyqCount: 20,
      topics: [
        {
          id: 'm4-hypothesis-testing',
          name: 'Hypothesis Testing: Student t-Test & Chi-Square Test',
          unitId: 'kas302-u5',
          subjectId: 'kas302',
          difficulty: 'MEDIUM',
          importance: 'CRITICAL',
          estimatedMinutes: 50,
          prerequisites: ['Normal Distribution', 'Degrees of Freedom'],
          nextTopics: ['Quality Control Charts'],
          quickExplanation: 'Hypothesis testing makes statistical decisions on sample data: Null hypothesis H0 (no effect/difference) vs Alternative hypothesis H1. t-test is used for small samples (n < 30); Chi-Square tests goodness of fit and independence.',
          deepExplanation: 'Student t-test: t = (x_bar - mu) / (s / sqrt(n)), with degrees of freedom df = n - 1. If |t_calculated| > t_tabulated, reject H0. Chi-Square Test: chi^2 = sum [(O - E)^2 / E], where O is observed frequency, E is expected frequency. df = (rows - 1)*(cols - 1).',
          whyItMatters: 'A/B testing in software products, clinical trial verification, and algorithm benchmark comparisons.',
          coreConceptsList: [
            'Null Hypothesis (H0) vs Alternative Hypothesis (H1)',
            'Type I error (rejecting true H0) vs Type II error',
            't-test statistic: t = (x_bar - mu) / (s / sqrt(n))',
            'Chi-Square goodness of fit: chi^2 = sum [(O - E)^2 / E]'
          ],
          visualDiagram: `Hypothesis Decision Rule:
        Accept H0              | Reject H0 (Critical Region)
-------------------------------+------------------------->
0                    t_tabulated                    t_calc`,
          visualDiagramType: 'architecture',
          workedExample: {
            problem: 'Sample of 10 items: x_bar = 48, s = 4. Test if sample comes from population with mu = 50 at 5% significance (t_tab = 2.262 for df=9).',
            stepByStepSolution: [
              'H0: mu = 50 (sample belongs to population), H1: mu != 50',
              't_calc = (48 - 50) / (4 / sqrt(10)) = -2 / (4 / 3.162) = -2 / 1.265 = -1.58',
              '|t_calc| = 1.58. Since |t_calc| (1.58) < t_tab (2.262), we accept H0 at 5% level.'
            ],
            explanation: 'Difference between sample mean and population mean is not statistically significant.'
          },
          commonMistakes: ['Confusing degrees of freedom (df = n - 1 for single sample t-test).'],
          examPerspective: {
            twoMarks: 'Define Null Hypothesis and Type I error.',
            fiveMarks: 'Explain the procedure for Chi-Square test of independence of attributes.',
            tenMarks: 'Solve a complete t-test or Chi-square numerical problem stating H0, H1, calculations and decision.',
            highYieldKeywords: ['Null Hypothesis', 'Degrees of Freedom', 'Student t-Test', 'Chi-Square', 'Critical Region']
          },
          activeRecallPrompt: {
            question: 'What is the decision rule in hypothesis testing when |t_calculated| > t_tabulated?',
            idealAnswer: 'Reject the Null Hypothesis (H0) and accept the Alternative Hypothesis (H1).',
            keyPoints: ['Reject H0 when calc > tab']
          },
          feynmanPrompt: 'Explain hypothesis testing like a court trial where a defendant is assumed innocent (H0) until strong evidence says otherwise.',
          examWeightage: { twoMarkFreq: 7, fiveMarkFreq: 6, tenMarkFreq: 7, frequentlyAsked: true }
        }
      ]
    }
  ]
};
