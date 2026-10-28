data Product = Product String Integer Double deriving Show 
applyDiscountD price discount = (price :: Double) * (1 - discount) 
applyDiscountI price discount = (price :: Int) * (1 - discount)
