import { Module } from '@nestjs/common';
import { HttpModule } from './modules/http/http.module';

@Module({
  imports: [HttpModule],
  components: [],

})
export class ApplicationModule {}
